import zerorpc
import factom_gateway

b = factom_gateway.BitMedi()

class BitMediRPC(object):
    def login(self,ID):
        return [0xdead,0xdeae,0xdeaf]
        
    def query(self,Hash):
        return 

    def append(self,userID,entry,cipher):
        return

    def showAddress(self):
        return b.show_address()

s = zerorpc.Server(BitMediRPC())
s.bind("tcp://0.0.0.0:4242")
s.run()
