{
  "session": [
    {
      "dateFormat": "MDY",
      "timeFormat": "12",
      "resources": "Development13",
      "COMETURL": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6399823002&COMETMode=JS",
      "COMETAjax": "&SERVICE=AJAX",
      "COMETSID": "6399823002"
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
      "OMORMCD": "&nbsp;",
      "OMENDT": "&nbsp;",
      "OMENSFQ": "&nbsp;",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "&nbsp;",
      "OMENLCP": "&nbsp;",
      "RENEWAL": "&nbsp;",
      "OMENTMN": "&nbsp;"
    },
    {
      "OMORMTP": "NU",
      "OMORMCD": "Bath",
      "OMENDT": "08/30/2015",
      "OMENSFQ": "QD - Daily AM",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "OV",
      "OMENLCP": "&nbsp;",
      "RENEWAL": "1/1",
      "OMENTMN": "15/000003",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "C"
          },
          {
            "code": "D"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "-R"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "M"
          }
        ],
        "params": "&OMENTMN=15/000003&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "ST",
      "OMORMCD": "Speech Therapy",
      "OMENDT": "01/01/2013",
      "OMENSFQ": "QD - Daily AM",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "OV",
      "OMENLCP": "09/13/2013",
      "RENEWAL": "1/1",
      "OMENTMN": "13/000015",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "C"
          },
          {
            "code": "D"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "-R"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "M"
          }
        ],
        "params": "&OMENTMN=13/000015&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "ST",
      "OMORMCD": "Speech Therapy",
      "OMENDT": "01/01/2013",
      "OMENSFQ": "QD - Daily AM",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "OV",
      "OMENLCP": "10/22/2013",
      "RENEWAL": "1/1",
      "OMENTMN": "13/000016",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "C"
          },
          {
            "code": "D"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "-R"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "M"
          }
        ],
        "params": "&OMENTMN=13/000016&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "ST",
      "OMORMCD": "Speech/Language Evaluation",
      "OMENDT": "01/01/2013",
      "OMENSFQ": "QD - Daily AM",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "OV",
      "OMENLCP": "02/01/2013",
      "RENEWAL": "1/1",
      "OMENTMN": "13/000017",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "C"
          },
          {
            "code": "D"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "-R"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "M"
          }
        ],
        "params": "&OMENTMN=13/000017&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "AU",
      "OMORMCD": "Complete Audiology Evaluation",
      "OMENDT": "12/10/2012",
      "OMENSFQ": "ONCE - One Time",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "OV",
      "OMENLCP": "&nbsp;",
      "RENEWAL": "1/1",
      "OMENTMN": "12/000316",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "C"
          },
          {
            "code": "D"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "-R"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "M"
          }
        ],
        "params": "&OMENTMN=12/000316&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "NR",
      "OMORMCD": "Walking",
      "OMENDT": "12/10/2012",
      "OMENSFQ": "Twice a Day",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "OV",
      "OMENLCP": "12/06/2013",
      "RENEWAL": "1/1",
      "OMENTMN": "12/000317",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "C"
          },
          {
            "code": "D"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "-R"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "M"
          }
        ],
        "params": "&OMENTMN=12/000317&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "OT",
      "OMORMCD": "OT Therapy",
      "OMENDT": "08/23/2012",
      "OMENSFQ": "QD - Daily AM",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "OV",
      "OMENLCP": "09/12/2013",
      "RENEWAL": "1/1",
      "OMENTMN": "12/000313",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "C"
          },
          {
            "code": "D"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "-R"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "M"
          }
        ],
        "params": "&OMENTMN=12/000313&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "PT",
      "OMORMCD": "PT Therapy",
      "OMENDT": "08/22/2012",
      "OMENSFQ": "QD - Daily AM",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "OV",
      "OMENLCP": "08/19/2015",
      "RENEWAL": "1/1",
      "OMENTMN": "12/000312",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "C"
          },
          {
            "code": "D"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "-R"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "M"
          }
        ],
        "params": "&OMENTMN=12/000312&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "PT",
      "OMORMCD": "PT Therapy",
      "OMENDT": "12/21/2011",
      "OMENSFQ": "3 Days a Week",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "DC",
      "OMENLCP": "&nbsp;",
      "RENEWAL": "1/1",
      "OMENTMN": "11/000050",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-C"
          },
          {
            "code": "-R"
          },
          {
            "code": "-D"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "-M"
          }
        ],
        "params": "&OMENTMN=11/000050&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "ST",
      "OMORMCD": "Speech Therapy",
      "OMENDT": "12/21/2011",
      "OMENSFQ": "Once a Week",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "DC",
      "OMENLCP": "&nbsp;",
      "RENEWAL": "1/1",
      "OMENTMN": "11/000051",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-C"
          },
          {
            "code": "-R"
          },
          {
            "code": "-D"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "-M"
          }
        ],
        "params": "&OMENTMN=11/000051&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "PT",
      "OMORMCD": "PT Therapy",
      "OMENDT": "12/21/2011",
      "OMENSFQ": "3 Days a Week",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "DC",
      "OMENLCP": "&nbsp;",
      "RENEWAL": "1/1",
      "OMENTMN": "11/000054",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-C"
          },
          {
            "code": "-R"
          },
          {
            "code": "-D"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "-M"
          }
        ],
        "params": "&OMENTMN=11/000054&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "ST",
      "OMORMCD": "Speech Therapy",
      "OMENDT": "12/21/2011",
      "OMENSFQ": "2 Days a Week",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "DC",
      "OMENLCP": "&nbsp;",
      "RENEWAL": "1/1",
      "OMENTMN": "11/000055",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-C"
          },
          {
            "code": "-R"
          },
          {
            "code": "-D"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "-M"
          }
        ],
        "params": "&OMENTMN=11/000055&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "PT",
      "OMORMCD": "PT Therapy",
      "OMENDT": "12/21/2011",
      "OMENSFQ": "3 Days a Week",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "DC",
      "OMENLCP": "&nbsp;",
      "RENEWAL": "1/1",
      "OMENTMN": "11/000056",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-C"
          },
          {
            "code": "-R"
          },
          {
            "code": "-D"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "-M"
          }
        ],
        "params": "&OMENTMN=11/000056&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "ST",
      "OMORMCD": "Speech Therapy",
      "OMENDT": "12/21/2011",
      "OMENSFQ": "2 Days a Week",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "DC",
      "OMENLCP": "&nbsp;",
      "RENEWAL": "1/1",
      "OMENTMN": "11/000057",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-C"
          },
          {
            "code": "-R"
          },
          {
            "code": "-D"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "M"
          }
        ],
        "params": "&OMENTMN=11/000057&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "NR",
      "OMORMCD": "Dressing or grooming",
      "OMENDT": "12/21/2011",
      "OMENSFQ": "TID PRN",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "DC",
      "OMENLCP": "&nbsp;",
      "RENEWAL": "1/1",
      "OMENTMN": "11/000058",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-C"
          },
          {
            "code": "-R"
          },
          {
            "code": "-D"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "M"
          }
        ],
        "params": "&OMENTMN=11/000058&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "LS",
      "OMORMCD": "POTASSIUM",
      "OMENDT": "12/20/2011",
      "OMENSFQ": "Information only",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "DC",
      "OMENLCP": "12/20/2011",
      "RENEWAL": "1/1",
      "OMENTMN": "11/000047",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-C"
          },
          {
            "code": "-R"
          },
          {
            "code": "-D"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "M"
          }
        ],
        "params": "&OMENTMN=11/000047&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "AU",
      "OMORMCD": "Complete Audiology Evaluation",
      "OMENDT": "12/20/2011",
      "OMENSFQ": "ONCE - One Time",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "DC",
      "OMENLCP": "&nbsp;",
      "RENEWAL": "1/1",
      "OMENTMN": "11/000049",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-C"
          },
          {
            "code": "-R"
          },
          {
            "code": "-D"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "M"
          }
        ],
        "params": "&OMENTMN=11/000049&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "DIET",
      "OMORMCD": "NPO",
      "OMENDT": "12/13/2011",
      "OMENSFQ": "MEALS",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "DC",
      "OMENLCP": "&nbsp;",
      "RENEWAL": "1/1",
      "OMENTMN": "11/000045",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-C"
          },
          {
            "code": "-R"
          },
          {
            "code": "-D"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "-M"
          }
        ],
        "params": "&OMENTMN=11/000045&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "LS",
      "OMORMCD": "DIGOXIN LEVEL",
      "OMENDT": "12/12/2011",
      "OMENSFQ": "Information only",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "DC",
      "OMENLCP": "&nbsp;",
      "RENEWAL": "1/1",
      "OMENTMN": "11/000043",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-C"
          },
          {
            "code": "-R"
          },
          {
            "code": "-D"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "M"
          }
        ],
        "params": "&OMENTMN=11/000043&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "DIET",
      "OMORMCD": "May have alcohol",
      "OMENDT": "12/12/2011",
      "OMENSFQ": "AC+HS - Before Meals and at Bedtime",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "DC",
      "OMENLCP": "&nbsp;",
      "RENEWAL": "1/1",
      "OMENTMN": "11/000044",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-C"
          },
          {
            "code": "-R"
          },
          {
            "code": "-D"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "-M"
          }
        ],
        "params": "&OMENTMN=11/000044&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "NR",
      "OMORMCD": "Range of Motion (Passive)",
      "OMENDT": "12/06/2011",
      "OMENSFQ": "3 Days a Week",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "DC",
      "OMENLCP": "&nbsp;",
      "RENEWAL": "1/1",
      "OMENTMN": "11/000041",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-C"
          },
          {
            "code": "-R"
          },
          {
            "code": "-D"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "M"
          }
        ],
        "params": "&OMENTMN=11/000041&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "ACT",
      "OMORMCD": "Activities - As tolerated",
      "OMENDT": "11/29/2011",
      "OMENSFQ": "Information only",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "DC",
      "OMENLCP": "&nbsp;",
      "RENEWAL": "1/1",
      "OMENTMN": "11/000040",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-C"
          },
          {
            "code": "-R"
          },
          {
            "code": "-D"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "M"
          }
        ],
        "params": "&OMENTMN=11/000040&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "DCV",
      "OMORMCD": "Electrocardiogram",
      "OMENDT": "11/22/2011",
      "OMENSFQ": "ONCE - One Time",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "DC",
      "OMENLCP": "&nbsp;",
      "RENEWAL": "1/1",
      "OMENTMN": "11/000038",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-C"
          },
          {
            "code": "-R"
          },
          {
            "code": "-D"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "-M"
          }
        ],
        "params": "&OMENTMN=11/000038&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "ST",
      "OMORMCD": "Speech Therapy",
      "OMENDT": "11/15/2011",
      "OMENSFQ": "3 Days a Week",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "DC",
      "OMENLCP": "&nbsp;",
      "RENEWAL": "1/1",
      "OMENTMN": "11/000036",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-C"
          },
          {
            "code": "-R"
          },
          {
            "code": "-D"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "-M"
          }
        ],
        "params": "&OMENTMN=11/000036&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "ACT",
      "OMORMCD": "Activities - As tolerated",
      "OMENDT": "11/15/2011",
      "OMENSFQ": "Every 3 Days",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "DC",
      "OMENLCP": "&nbsp;",
      "RENEWAL": "1/1",
      "OMENTMN": "11/000037",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-C"
          },
          {
            "code": "-R"
          },
          {
            "code": "-D"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "-M"
          }
        ],
        "params": "&OMENTMN=11/000037&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "XR",
      "OMORMCD": "CHEST CARDIAC SERIES",
      "OMENDT": "11/10/2011",
      "OMENSFQ": "ONCE - One Time",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "DC",
      "OMENLCP": "&nbsp;",
      "RENEWAL": "1/1",
      "OMENTMN": "11/000033",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-C"
          },
          {
            "code": "-R"
          },
          {
            "code": "-D"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "M"
          }
        ],
        "params": "&OMENTMN=11/000033&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "OT",
      "OMORMCD": "OT Therapy",
      "OMENDT": "11/10/2011",
      "OMENSFQ": "2 Days a Week",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "DC",
      "OMENLCP": "&nbsp;",
      "RENEWAL": "1/1",
      "OMENTMN": "11/000035",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-C"
          },
          {
            "code": "-R"
          },
          {
            "code": "-D"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "-M"
          }
        ],
        "params": "&OMENTMN=11/000035&TYPE=ON&CALLBY=WOM0011"
      }
    },
    {
      "OMORMTP": "ST",
      "OMORMCD": "Speech Therapy",
      "OMENDT": "01/06/2003",
      "OMENSFQ": "QD - Daily AM",
      "OMENRVW": "&nbsp;",
      "OMENSTS": "OV",
      "OMENLCP": "12/06/2013",
      "RENEWAL": "1/1",
      "OMENTMN": "13/000018",
      "lineOptions": {
        "list": [
          {
            "code": "V"
          },
          {
            "code": "C"
          },
          {
            "code": "D"
          },
          {
            "code": "N"
          },
          {
            "code": "-VL"
          },
          {
            "code": "-DE"
          },
          {
            "code": "-G"
          },
          {
            "code": "-P"
          },
          {
            "code": "-R"
          },
          {
            "code": "ST"
          },
          {
            "code": "H"
          },
          {
            "code": "M"
          }
        ],
        "params": "&OMENTMN=13/000018&TYPE=ON&CALLBY=WOM0011"
      }
    }
  ],
  "buttons": [
    {
      "type": "button",
      "label": "Home",
      "onclick": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6399823002&COMETMode=JS&SERVICE=APPMENU&REQUEST=COMET&STAGE=REQUEST",
      "disabled": "true"
    }
  ],
  "menuOptions": [
    {
      "id": "C",
      "url": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6399823002&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WOM0011&STAGE=SAVE;CHANGE",
      "dialog": "",
      "header": "Change"
    },
    {
      "id": "V",
      "url": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6399823002&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WOM0011&STAGE=SAVE;DISPLAY",
      "dialog": "",
      "header": "View"
    },
    {
      "id": "M",
      "url": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6399823002&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WOM0011&STAGE=SAVE;COMPLETE",
      "dialog": "",
      "header": "Complete"
    },
    {
      "id": "G",
      "url": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6399823002&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WOM0011&STAGE=SAVE;GENCHRG",
      "dialog": "",
      "header": "Generated Charges"
    },
    {
      "id": "P",
      "url": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6399823002&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WOM0011&STAGE=SAVE;PRMCHRG",
      "dialog": "",
      "header": "Prompted Charges"
    },
    {
      "id": "VL",
      "url": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6399823002&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WOM0011&STAGE=SAVE;VALIDATE",
      "dialog": "Validate the Order ?",
      "header": "Validate"
    },
    "",
    {
      "id": "R",
      "url": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6399823002&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WOM0011&STAGE=SAVE;RENEW",
      "dialog": "Renew the Order ?",
      "header": "Renew"
    },
    {
      "id": "D",
      "url": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6399823002&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WOM0011&STAGE=SAVE;DISCONTI",
      "dialog": "",
      "header": "Discontinue"
    },
    {
      "id": "DE",
      "url": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6399823002&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WOM0011&STAGE=SAVE;DELETE",
      "dialog": "Delete this Order ?",
      "header": "Delete"
    },
    "",
    {
      "id": "N",
      "url": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6399823002&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WOM0011&STAGE=SAVE;NOTE",
      "dialog": "",
      "header": "Note"
    },
    {
      "id": "H",
      "url": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6399823002&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WOM0011&STAGE=SAVE;HISTORY",
      "dialog": "",
      "header": "History"
    },
    {
      "id": "ST",
      "url": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6399823002&COMETMode=JS&SERVICE=DATAFORM&REQUEST=WOM0011&STAGE=SAVE;START",
      "dialog": "",
      "header": "Change Start Date"
    }
  ]
}