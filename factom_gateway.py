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

# --------- functions ---------
def fct_post(url, action, target, values):
    """
    this function for posting data from bitmedi svr from factom svr.
    url - factom svr url
    action - factom action, compose-chain-submit etc.
    target - factom element, address, chain (name) etc.
    url + action + target gives the whole URL to aceess fcactom svr
    data - the data need to submit.
    """

    jdata = json.dumps(values)
    #print url+action+"/"+target
    s = requests.post(url+action+"/"+target, jdata)
    print s.json()
    return s.json()

def fct_inquiry(url, action, target):
    """
    this function for inquiry data from bitmedi svr from factom svr.
    url - factom svr url
    action - factom action, compose-chain-submit etc.
    target - factom element, address, chain (name) etc.
    url + action + target gives the whole URL to aceess fcactom svr
    """

    s = requests.get(url+action+"/"+target)
    print s.json()
    return s.json()

def local_validate():
    pass

def init_chain(seq, entry_name):
    values = {"ExtIDs":["bitmedi", seq], 
                "Content":"NO."+seq+" chain of bitmedi"}
    s = fct_post(factom_svr_url ,"compose-chain-submit", entry_name, values);
    bitmedi_chain_list.append(s[u'ChainID'])

def post_record():
    values = {"ChainID":"92475004e70f41b94750f4a77bf7b430551113b25d3d57169eadca5692bb043d", 
                "ExtIDs":["foo", "bar"], 
                "Content":"Hello Factom!"}
    fct_post(factom_svr_url ,"compose-entry-submit", "zeros", values);

def show_balance():
    fct_inquiry(factom_svr_url, "factoid-balance", "FA2jK2HcLnRdS94dEcU27rF3meoJfpUcZPSinpb7AwQvPRY6RL1Q")

def get_enc_record_from_fct(user_id, hash_code):
    pass
def post_enc_record_to_fct(user_id, enc_content):
    pass

# --------- main ---------
if __name__ == '__main__':
    print "testing begin"

    factom_svr_url = "http://bitmedi:8089/v1/"
    bitmedi_chain_list = []

    init_chain("1", "zeros")
    print bitmedi_chain_list
    #show_balance()
    #post_chain()
    #post_record()

