{
  "session": [
    {
      "dateFormat": "MDY",
      "timeFormat": "12",
      "resources": "Development13",
      "COMETURL": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6411918284&COMETMode=JS",
      "COMETAjax": "&SERVICE=AJAX",
      "COMETSID": "6411918284"
    }
  ],
  "form": [
    {
      "id": "WOM0011",
      "title": "OM Orders Summary (WOM0011)",
      "type": "Summary",
      "external": [
        {
          "script1": "/Development13/script/FormUpdate.js",
          "script2": "another.js",
          "stylesheet1": "first.css",
          "stylesheet2": "another.css"
        }
      ]
    }
  ],
  "columnDefs": [
    {
      "label": "Type",
      "field": "OMORMTP",
      "type": "link",
      "linkService": "DATAFORM",
      "linkRequest": "WOM0012",
      "linkStage": "REQUEST",
      "linkParams": "OMENTMN;"
    },
    {
      "label": "Code",
      "field": "OMORMCD",
      "type": "text",
      "linkService": "",
      "linkRequest": "",
      "linkStage": "",
      "linkParams": ""
    },
    {
      "label": "Date",
      "field": "OMENDT",
      "type": "text",
      "linkService": "",
      "linkRequest": "",
      "linkStage": "",
      "linkParams": ""
    },
    {
      "label": "SIG",
      "field": "OMENSFQ",
      "type": "text",
      "linkService": "",
      "linkRequest": "",
      "linkStage": "",
      "linkParams": ""
    },
    {
      "label": "Review",
      "field": "OMENRVW",
      "type": "text",
      "linkService": "",
      "linkRequest": "",
      "linkStage": "",
      "linkParams": ""
    },
    {
      "label": "St",
      "field": "OMENSTS",
      "type": "text",
      "linkService": "",
      "linkRequest": "",
      "linkStage": "",
      "linkParams": ""
    },
    {
      "label": "Completed",
      "field": "OMENLCP",
      "type": "text",
      "linkService": "",
      "linkRequest": "",
      "linkStage": "",
      "linkParams": ""
    },
    {
      "label": "Renew",
      "field": "RENEWAL",
      "type": "text",
      "linkService": "",
      "linkRequest": "",
      "linkStage": "",
      "linkParams": ""
    },
    {
      "label": "Order #",
      "field": "OMENTMN",
      "type": "hidden",
      "linkService": "",
      "linkRequest": "",
      "linkStage": "",
      "linkParams": ""
    }
  ],
  "data": [
    {
      "OMORMTP": "Add",
      "OMORMCD": "",
      "OMENDT": "",
      "OMENSFQ": "",
      "OMENRVW": "",
      "OMENSTS": "",
      "OMENLCP": "",
      "RENEWAL": "",
      "OMENTMN": ""
    },
    {
      "OMORMTP": "ST",
      "OMORMCD": "Speech Therapy",
      "OMENDT": "01/01/2013",
      "OMENSFQ": "QD - Daily AM",
      "OMENRVW": "07/17/2016",
      "OMENSTS": "OV",
      "OMENLCP": "09/13/2013",
      "RENEWAL": "2/1",
      "OMENTMN": "13/000015",
      "lineOptions": {
        "list": [
          "V",
          "C",
          "D",
          "N",
          "-VL",
          "-DE",
          "-G",
          "-P",
          "-R",
          "ST",
          "H",
          "M"
        ],
        "params": "&OMENTMN=13/000015&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "ST",
      "OMORMCD": "Speech Therapy",
      "OMENDT": "01/01/2013",
      "OMENSFQ": "QD - Daily AM",
      "OMENRVW": "",
      "OMENSTS": "OV",
      "OMENLCP": "10/22/2013",
      "RENEWAL": "2/1",
      "OMENTMN": "13/000016",
      "lineOptions": {
        "list": [
          "V",
          "C",
          "D",
          "N",
          "-VL",
          "-DE",
          "-G",
          "-P",
          "-R",
          "ST",
          "H",
          "M"
        ],
        "params": "&OMENTMN=13/000016&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "ST",
      "OMORMCD": "Speech/Language Evaluation",
      "OMENDT": "01/01/2013",
      "OMENSFQ": "QD - Daily AM",
      "OMENRVW": "",
      "OMENSTS": "OV",
      "OMENLCP": "02/01/2013",
      "RENEWAL": "2/1",
      "OMENTMN": "13/000017",
      "lineOptions": {
        "list": [
          "V",
          "C",
          "D",
          "N",
          "-VL",
          "-DE",
          "-G",
          "-P",
          "-R",
          "ST",
          "H",
          "M"
        ],
        "params": "&OMENTMN=13/000017&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "AU",
      "OMORMCD": "Complete Audiology Evaluation",
      "OMENDT": "12/10/2012",
      "OMENSFQ": "ONCE - One Time",
      "OMENRVW": "",
      "OMENSTS": "OV",
      "OMENLCP": "",
      "RENEWAL": "2/1",
      "OMENTMN": "12/000316",
      "lineOptions": {
        "list": [
          "V",
          "C",
          "D",
          "N",
          "-VL",
          "-DE",
          "-G",
          "-P",
          "-R",
          "ST",
          "H",
          "M"
        ],
        "params": "&OMENTMN=12/000316&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "NR",
      "OMORMCD": "Walking",
      "OMENDT": "12/10/2012",
      "OMENSFQ": "Twice a Day",
      "OMENRVW": "",
      "OMENSTS": "OV",
      "OMENLCP": "12/06/2013",
      "RENEWAL": "2/1",
      "OMENTMN": "12/000317",
      "lineOptions": {
        "list": [
          "V",
          "C",
          "D",
          "N",
          "-VL",
          "-DE",
          "-G",
          "-P",
          "-R",
          "ST",
          "H",
          "M"
        ],
        "params": "&OMENTMN=12/000317&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "OT",
      "OMORMCD": "OT Therapy",
      "OMENDT": "08/23/2012",
      "OMENSFQ": "QD - Daily AM",
      "OMENRVW": "",
      "OMENSTS": "OV",
      "OMENLCP": "09/12/2013",
      "RENEWAL": "1/1",
      "OMENTMN": "12/000313",
      "lineOptions": {
        "list": [
          "V",
          "C",
          "D",
          "N",
          "-VL",
          "-DE",
          "-G",
          "-P",
          "-R",
          "ST",
          "H",
          "M"
        ],
        "params": "&OMENTMN=12/000313&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "PT",
      "OMORMCD": "PT Therapy",
      "OMENDT": "08/22/2012",
      "OMENSFQ": "QD - Daily AM",
      "OMENRVW": "",
      "OMENSTS": "OV",
      "OMENLCP": "08/19/2015",
      "RENEWAL": "1/1",
      "OMENTMN": "12/000312",
      "lineOptions": {
        "list": [
          "V",
          "C",
          "D",
          "N",
          "-VL",
          "-DE",
          "-G",
          "-P",
          "-R",
          "ST",
          "H",
          "M"
        ],
        "params": "&OMENTMN=12/000312&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "ST",
      "OMORMCD": "Speech Therapy",
      "OMENDT": "01/06/2003",
      "OMENSFQ": "QD - Daily AM",
      "OMENRVW": "",
      "OMENSTS": "OV",
      "OMENLCP": "12/06/2013",
      "RENEWAL": "1/1",
      "OMENTMN": "13/000018",
      "lineOptions": {
        "list": [
          "V",
          "C",
          "D",
          "N",
          "-VL",
          "-DE",
          "-G",
          "-P",
          "-R",
          "ST",
          "H",
          "M"
        ],
        "params": "&OMENTMN=13/000018&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "NU",
      "OMORMCD": "Bath",
      "OMENDT": "",
      "OMENSFQ": "QD - Daily AM",
      "OMENRVW": "",
      "OMENSTS": "OV",
      "OMENLCP": "03/29/2016",
      "RENEWAL": "1/1",
      "OMENTMN": "15/000003",
      "lineOptions": {
        "list": [
          "V",
          "C",
          "D",
          "N",
          "-VL",
          "-DE",
          "-G",
          "-P",
          "-R",
          "ST",
          "H",
          "M"
        ],
        "params": "&OMENTMN=15/000003&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "ST",
      "OMORMCD": "Speech Therapy",
      "OMENDT": "01/01/2013",
      "OMENSFQ": "QD - Daily AM",
      "OMENRVW": "07/17/2016",
      "OMENSTS": "OV",
      "OMENLCP": "09/13/2013",
      "RENEWAL": "2/1",
      "OMENTMN": "13/000015",
      "lineOptions": {
        "list": [
          "V",
          "C",
          "D",
          "N",
          "-VL",
          "-DE",
          "-G",
          "-P",
          "-R",
          "ST",
          "H",
          "M"
        ],
        "params": "&OMENTMN=13/000015&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "ST",
      "OMORMCD": "Speech Therapy",
      "OMENDT": "01/01/2013",
      "OMENSFQ": "QD - Daily AM",
      "OMENRVW": "",
      "OMENSTS": "OV",
      "OMENLCP": "10/22/2013",
      "RENEWAL": "2/1",
      "OMENTMN": "13/000016",
      "lineOptions": {
        "list": [
          "V",
          "C",
          "D",
          "N",
          "-VL",
          "-DE",
          "-G",
          "-P",
          "-R",
          "ST",
          "H",
          "M"
        ],
        "params": "&OMENTMN=13/000016&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "ST",
      "OMORMCD": "Speech/Language Evaluation",
      "OMENDT": "01/01/2013",
      "OMENSFQ": "QD - Daily AM",
      "OMENRVW": "",
      "OMENSTS": "OV",
      "OMENLCP": "02/01/2013",
      "RENEWAL": "2/1",
      "OMENTMN": "13/000017",
      "lineOptions": {
        "list": [
          "V",
          "C",
          "D",
          "N",
          "-VL",
          "-DE",
          "-G",
          "-P",
          "-R",
          "ST",
          "H",
          "M"
        ],
        "params": "&OMENTMN=13/000017&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "AU",
      "OMORMCD": "Complete Audiology Evaluation",
      "OMENDT": "12/10/2012",
      "OMENSFQ": "ONCE - One Time",
      "OMENRVW": "",
      "OMENSTS": "OV",
      "OMENLCP": "",
      "RENEWAL": "2/1",
      "OMENTMN": "12/000316",
      "lineOptions": {
        "list": [
          "V",
          "C",
          "D",
          "N",
          "-VL",
          "-DE",
          "-G",
          "-P",
          "-R",
          "ST",
          "H",
          "M"
        ],
        "params": "&OMENTMN=12/000316&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "NR",
      "OMORMCD": "Walking",
      "OMENDT": "12/10/2012",
      "OMENSFQ": "Twice a Day",
      "OMENRVW": "",
      "OMENSTS": "OV",
      "OMENLCP": "12/06/2013",
      "RENEWAL": "2/1",
      "OMENTMN": "12/000317",
      "lineOptions": {
        "list": [
          "V",
          "C",
          "D",
          "N",
          "-VL",
          "-DE",
          "-G",
          "-P",
          "-R",
          "ST",
          "H",
          "M"
        ],
        "params": "&OMENTMN=12/000317&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "OT",
      "OMORMCD": "OT Therapy",
      "OMENDT": "08/23/2012",
      "OMENSFQ": "QD - Daily AM",
      "OMENRVW": "",
      "OMENSTS": "OV",
      "OMENLCP": "09/12/2013",
      "RENEWAL": "1/1",
      "OMENTMN": "12/000313",
      "lineOptions": {
        "list": [
          "V",
          "C",
          "D",
          "N",
          "-VL",
          "-DE",
          "-G",
          "-P",
          "-R",
          "ST",
          "H",
          "M"
        ],
        "params": "&OMENTMN=12/000313&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "PT",
      "OMORMCD": "PT Therapy",
      "OMENDT": "08/22/2012",
      "OMENSFQ": "QD - Daily AM",
      "OMENRVW": "",
      "OMENSTS": "OV",
      "OMENLCP": "08/19/2015",
      "RENEWAL": "1/1",
      "OMENTMN": "12/000312",
      "lineOptions": {
        "list": [
          "V",
          "C",
          "D",
          "N",
          "-VL",
          "-DE",
          "-G",
          "-P",
          "-R",
          "ST",
          "H",
          "M"
        ],
        "params": "&OMENTMN=12/000312&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "ST",
      "OMORMCD": "Speech Therapy",
      "OMENDT": "01/06/2003",
      "OMENSFQ": "QD - Daily AM",
      "OMENRVW": "",
      "OMENSTS": "OV",
      "OMENLCP": "12/06/2013",
      "RENEWAL": "1/1",
      "OMENTMN": "13/000018",
      "lineOptions": {
        "list": [
          "V",
          "C",
          "D",
          "N",
          "-VL",
          "-DE",
          "-G",
          "-P",
          "-R",
          "ST",
          "H",
          "M"
        ],
        "params": "&OMENTMN=13/000018&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "NU",
      "OMORMCD": "Bath",
      "OMENDT": "",
      "OMENSFQ": "QD - Daily AM",
      "OMENRVW": "",
      "OMENSTS": "OV",
      "OMENLCP": "03/29/2016",
      "RENEWAL": "1/1",
      "OMENTMN": "15/000003",
      "lineOptions": {
        "list": [
          "V",
          "C",
          "D",
          "N",
          "-VL",
          "-DE",
          "-G",
          "-P",
          "-R",
          "ST",
          "H",
          "M"
        ],
        "params": "&OMENTMN=15/000003&TYPE=ON&CALLBY=WOM0011"
      }
    }
  ],
  "buttons": [
    {
      "type": "button",
      "label": "Home",
      "onclick": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6411918284&COMETMode=JS&SERVICE=APPMENU&REQUEST=COMET&STAGE=REQUEST",
      "disabled": "true"
    }
  ],
  "menuOptions": [
    {
      "id": "C",
      "url": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6411918284&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WOM0011&STAGE=SAVE;CHANGE",
      "dialog": "",
      "header": "Change"
    },
    {
      "id": "V",
      "url": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6411918284&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WOM0011&STAGE=SAVE;DISPLAY",
      "dialog": "",
      "header": "View"
    },
    {
      "id": "M",
      "url": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6411918284&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WOM0011&STAGE=SAVE;COMPLETE",
      "dialog": "",
      "header": "Complete"
    },
    {
      "id": "G",
      "url": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6411918284&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WOM0011&STAGE=SAVE;GENCHRG",
      "dialog": "",
      "header": "Generated Charges"
    },
    {
      "id": "P",
      "url": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6411918284&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WOM0011&STAGE=SAVE;PRMCHRG",
      "dialog": "",
      "header": "Prompted Charges"
    },
    {
      "id": "VL",
      "url": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6411918284&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WOM0011&STAGE=SAVE;VALIDATE",
      "dialog": "Validate the Order ?",
      "header": "Validate"
    },
    "",
    {
      "id": "R",
      "url": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6411918284&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WOM0011&STAGE=SAVE;RENEW",
      "dialog": "Renew the Order ?",
      "header": "Renew"
    },
    {
      "id": "D",
      "url": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6411918284&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WOM0011&STAGE=SAVE;DISCONTI",
      "dialog": "",
      "header": "Discontinue"
    },
    {
      "id": "DE",
      "url": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6411918284&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WOM0011&STAGE=SAVE;DELETE",
      "dialog": "Delete this Order ?",
      "header": "Delete"
    },
    "",
    {
      "id": "N",
      "url": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6411918284&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WOM0011&STAGE=SAVE;NOTE",
      "dialog": "",
      "header": "Note"
    },
    {
      "id": "H",
      "url": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6411918284&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WOM0011&STAGE=SAVE;HISTORY",
      "dialog": "",
      "header": "History"
    },
    {
      "id": "ST",
      "url": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6411918284&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WOM0011&STAGE=SAVE;START",
      "dialog": "",
      "header": "Change Start Date"
    }
  ]
}