import frida
import sys  
import time


package = "de.fraunhofer.sit.premiumapp"
device = frida.get_usb_device()
pid = device.spawn([package])
device.resume(pid)
print("[P] device resumed")
time.sleep(1)
session = device.attach(pid)
print("[P] device attached")

def on_message(msg, data):
    # print(f"data : {data}")
    if msg["type"] == "send":
        print("[*] {0}".format(msg["payload"]))
    elif msg["type"] == "error":
        # print(msg["description"])
        print(msg["stack"])
    else:
        print(msg)

jscode = open("./script.js", encoding="utf-8").read()
script = session.create_script(jscode)
script.on("message", on_message)
script.load()
# sys.stdin.read()

while True:
    cmd = input("onni-chan # ")

    if cmd == "q" or cmd == "quit" or cmd == "exit":
        break
    
    elif cmd == "a":
        script.exports.aaa()

    elif cmd == "post":
        script.post({
            "type": "poke",
            "buf": "aaa"
        })
    
    else:
        print(f"[!] unknown command : {cmd}")