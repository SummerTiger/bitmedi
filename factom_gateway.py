#!/usr/bin/env python
# this is a main communication interface for factom block chain
# HAO CHEN

# --------- imports ---------
import os
import csv
import sys
import json
import requests

# --------- classes ---------

# --------- global vars -------
# you must give the host in file /etc/hosts

class BitMedi:
    def __init__(self):
        self.url = "http://bitmedi:8089/v1/"
        self.url2 = "http://bitmedi:8088/v1/"
        self.bitmedi_chain_dic = {}

    def fct_post(self, method, action, target, values):
        """
        this function for posting data from bitmedi svr from factom svr.
        url - factom svr url
        action - factom action, compose-chain-submit etc.
        target - factom element, address, chain (name) etc.
        url + action + target gives the whole URL to aceess fcactom svr
        data - the data need to submit.
        """

        jdata = json.dumps(values)
        if method == "fctwallet":
            s = requests.post(self.url+action+"/"+target, jdata)
            return s.json()
        else:
            #response 200
            return requests.post(self.url2+action+"/"+target, jdata)

    def fct_inquiry(self, methond, action, target):
        """
        this function for inquiry data from bitmedi svr from factom svr.
        url - factom svr url
        action - factom action, compose-chain-submit etc.
        target - factom element, address, chain (name) etc.
        url + action + target gives the whole URL to aceess fcactom svr
        """

        if method == "fctwallet":
            return requests.get(self.url+action+"/"+target).json()
        else:
            return requests.get(self.url2+action+"/"+target)

    def local_validate(self):
        pass

    def init_chain(self, seq, entry_name):
        values = {"ExtIDs":["bitmedi", seq], 
                    "Content":"NO."+seq+" chain of bitmedi"}
        s = self.fct_post("fctwallet", "compose-chain-submit", entry_name, values)
        self.bitmedi_chain_dic.setdefault(seq, s[u'ChainID'])
        print self.fct_post("factomd", "commit-chain", "", s[u'ChainCommit']) 
        print self.fct_post("factomd", "reveal-chain", "", s[u'EntryReveal']) 
        return s

    def post_record_to_fct(self, seq, entry_name, user_id, enc_content):
        values = {"ChainID":self.bitmedi_chain_dic[seq], 
                    "ExtIDs":[user_id], 
                    "Content":enc_content}
        s = self.fct_post("fctwallet", "compose-entry-submit", entry_name, values)
        print s
        # save user_id, entry_hash here
        print self.fct_post("factomd", "commit-entry", "", s[u'EntryCommit']) 
        print self.fct_post("factomd", "reveal-entry", "", s[u'EntryReveal']) 

    def get_record_from_fct(self, user_id, hash_code):
        pass

    def show_balance(self):
        self.fct_inquiry("fctwallet", "factoid-balance", "FA2jK2HcLnRdS94dEcU27rF3meoJfpUcZPSinpb7AwQvPRY6RL1Q")

    def show_address(self):
        self.fct_inquiry("fctwallet", "factoid-get-addresses", "")


# --------- main ---------
if __name__ == '__main__':
    print "testing begin"


    b=BitMedi()
    c=b.init_chain("10", "zeros")
    print b.bitmedi_chain_dic
    b.post_record_to_fct("10", "zeros", "chenhao", "code")
    #b.show_balance()
    #b.post_record()
    #b.show_address()

