#!/usr/bin/env python
#this is a main communication interface for factom block chain
#CHENHAO

# --------- imports ---------
import os
import sys
import json
import requests

# --------- classes ---------

# --------- global vars -------
factom_svr_url = "http://bitmedi:8089/v1/"

# --------- functions ---------
def create_chain():
    return 0

def post_chain():
    values = {"ExtIDs":["foo", "bar"], 
                "Content":"Hello Factom!"}
    jdata = json.dumps(values)
    s = requests.post('http://bitmedi:8089/v1/compose-chain-submit/zeros', jdata)
    print s.content

def post_record():
    values = {"ChainID":"92475004e70f41b94750f4a77bf7b430551113b25d3d57169eadca5692bb043d", 
                "ExtIDs":["foo", "bar"], 
                "Content":"Hello Factom!"}
    jdata = json.dumps(values)
    s = requests.post('http://bitmedi:8089/v1/compose-entry-submit/zeros', jdata)
    print s.content


def show_balance():
    s = requests.get(factom_svr_url+"factoid-balance/FA2jK2HcLnRdS94dEcU27rF3meoJfpUcZPSinpb7AwQvPRY6RL1Q")
    print s.content


# --------- main ---------
if __name__ == '__main__':
    print "testing begin"
    show_balance();
    #post_record();


