from os import listdir
from os.path import isfile, join
import lxml.html as html
from lxml import etree
import os

onlyfiles = [f for f in listdir("./") if isfile(join("./", f))]
onlyhtml = [f for f in onlyfiles if f.split(".")[-1] == "html"]

def createDefaulFile(name):
    output = open(os.path.splitext(name)[0]+".py", "w")
    output.write("----- some code was here -----")
    output.close()

def convertFile(name):
    htmlsource = open(name)
    page = html.parse(htmlsource)
    htmlsource.close()
    
    code = page.findall(".//code")
    if len(code) != 1:
        if len(code) == 0:
            createDefaulFile(name)
            return
        raise Exception(name+": multiple code tags!")
    output = open(os.path.splitext(name)[0]+".py", "w")
    output.write(code[0].text_content())
    output.close()

for filename in onlyhtml:
    convertFile(filename)
