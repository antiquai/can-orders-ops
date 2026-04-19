import os
import json
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from redis import Redis

# Loading .env variables
redis_h = os.getenv("REDIS_HOST", "localhost")
redis_p = os.getenv("REDIS_PORT", "6379")
email_user = os.getenv("EMAIL_HOST_USER", "")
email_pass = os.getenv("EMAIL_HOST_PASSWORD", "")

# Connecting to Redis queue
r = Redis(host=redis_h, port=int(redis_p), decode_responses=True)

print("--- SENDER AMIGO READY ---", flush=True)

# HTML raference for pasting
def generate_html_receipt(data, items_string):
    items_html = ""
    for item in data['items']:
        items_html += f"""
        <tr>
            <td style="padding: 5px 0;">{item['name']}</td>
            <td style="text-align: right; padding: 5px 0;">x{item['qty']}</td>
            <td style="text-align: right; padding: 5px 0;">{item['price']}$</td>
        </tr>
        """

    return f"""
    <html>
    <body style="background-color: #f0f0f0; padding: 20px; font-family: 'Courier New', Courier, monospace;">
        <div style="max-width: 400px; background-color: #fff; margin: 0 auto; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1); border-top: 5px dashed #000;">
            <div style="text-align: center; border-bottom: 2px dashed #eee; padding-bottom: 20px;">
                <h2 style="margin: 0; text-transform: uppercase;">Shop OPS</h2>
                <h2 style="margin: 0; text-transform: uppercase;">Dear Mr/Mrs {data['customer_surname']}</h2>
                <p style="font-size: 12px; color: #666;">YOUR ORDER #{data['order_number']} PROCESSED</p>
            </div>

            <table style="width: 100%; font-size: 14px; margin-top: 20px; border-collapse: collapse;">
                <thead>
                    <tr style="border-bottom: 1px solid #000;">
                        <th style="text-align: left;">ITEM</th>
                        <th style="text-align: right;">QTY</th>
                        <th style="text-align: right;">PRICE</th>
                    </tr>
                </thead>
                <tbody>
                    {items_html}
                </tbody>
            </table>

            <div style="margin-top: 20px; border-top: 2px dashed #eee; padding-top: 20px;">
                <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 18px;">
                    <span>TOTAL:</span>
                    <span style="float: right;">{data['total_price']}$</span>
                </div>
            </div>

            <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #999;">
                <p>THANK YOU FOR YOUR PURCHASE!</p>
                <p>*** KEEP THIS RECEIPT ***</p>
            </div>
        </div>
    </body>
    </html>
    """

# Send Email logic function
def send_email(user_to, order_data ):
    html_content = generate_html_receipt(order_data, order_data.get('items_list', ''))

    msg = MIMEMultipart("alternative")
    msg['Subject'] = f"Order information {order_data.get('order_number', '')}"
    msg['From'] = email_user
    msg['To'] = user_to

    part = MIMEText(html_content, "html")
    msg.attach(part)

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(email_user, email_pass)
            server.send_message(msg)
        print(f"[OK] Email sent to {user_to}", flush=True)
    except Exception as e:
        print(f"[ERROR] Email failed: {e}", flush=True)



while True:
    task = r.brpop("email_queue") # Слушаем свою очередь
    if task:
        order_info = json.loads(task[1])
        send_email(order_info['customer_email'], order_info)