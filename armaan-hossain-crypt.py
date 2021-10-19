Encrypt = input("Type in your message to encrypt: ")
eKey = int(input("Type in the key that you would wish to use: "))
eMessage = ""
for i in range(len(Encrypt)):
  num = ord(Encrypt[i]) + eKey
  while num > ord('z'):
    num-= 26
  eMessage += chr(num) + " "

print(eMessage)

Decrypt = input("Type in your message to Decrypt: ")
dKey = int(input("Type in the key that you would wish to use: "))
dMessage = ""

for i in range(len(Decrypt)):
  num = ord(Decrypt[i]) - dKey
  while num < ord("a"):
    num += 26
  dMessage += chr(num)

 
print(dMessage)
