{
  "session": [
    {
      "dateFormat": "MDY",
      "timeFormat": "12",
      "resources": "Development13",
      "COMETURL": "/comet.icsp?MGWLPN=iCOMET&COMETSID=6401525034&COMETMode=JS",
      "COMETAjax": "&SERVICE=AJAX",
      "COMETSID": "6401525034"
    }
  ],
  "form": [
    {
      "id": "WMR1014",
      "title": "Precautions (WMR1014)",
      "type": "ScrollingArea",
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
  "fields": [
    {
      "id": "PRECDATE",
      "type": "text",
      "label": "Date",
      "class": ""
    },
    {
      "id": "PRECTYPE",
      "type": "select",
      "label": "Type",
      "class": ""
    },
    {
      "id": "PRECTEXT",
      "type": "text",
      "label": "Precaution",
      "class": ""
    },
    {
      "id": "PRECACTV",
      "type": "checkbox",
      "label": "Active",
      "class": ""
    },
    {
      "id": "PRECNUM",
      "type": "hidden",
      "label": "",
      "class": ""
    }
  ],
  "dataRows": [
    [
      {
        "id": "delete",
        "type": "Image",
        "class": "removeBorder",
        "onclick": "deleteTableRow(this)",
        "src": "/Development13/source/delete.gif"
      },
      {
        "id": "PRECDATE",
        "value": "'03/30/2016'",
        "disabled": "false",
        "scrline": "1"
      },
      {
        "id": "PRECTYPE",
        "value": "F01",
        "disabled": "false",
        "scrline": "1",
        "options": [
          {
            "value": "B01",
            "description": "Behavio"
          },
          {
            "value": "C01",
            "description": "Communication"
          },
          {
            "value": "E01",
            "description": "Elopement"
          },
          {
            "value": "F06",
            "description": "Falls"
          },
          {
            "value": "F01",
            "description": "Food"
          },
          {
            "value": "I01",
            "description": "Isolation"
          },
          {
            "value": "O01",
            "description": "Oxygen"
          },
          {
            "value": "S01",
            "description": "Safety"
          }
        ]
      },
      {
        "id": "PRECTEXT",
        "value": "'Potato'",
        "disabled": "false",
        "scrline": "1"
      },
      {
        "id": "PRECACTV",
        "value": "",
        "checked": "false",
        "disabled": "false",
        "scrline": "1"
      },
      {
        "id": "PRECNUM",
        "value": "'1'",
        "disabled": "false",
        "scrline": "1"
      }
    ],
    [
      {
        "id": "",
        "type": "Image",
        "class": "removeBorder",
        "visible": "false",
        "onclick": "deleteTableRow(this)",
        "src": "/Development13/source/delete.gif"
      },
      {
        "id": "PRECDATE",
        "value": "",
        "disabled": "false",
        "scrline": "2",
        "addrow": ""
      },
      {
        "id": "PRECTYPE",
        "value": "",
        "disabled": "true",
        "scrline": "2",
        "options": [
          {
            "value": "B01",
            "description": "Behavio"
          },
          {
            "value": "C01",
            "description": "Communication"
          },
          {
            "value": "E01",
            "description": "Elopement"
          },
          {
            "value": "F06",
            "description": "Falls"
          },
          {
            "value": "F01",
            "description": "Food"
          },
          {
            "value": "I01",
            "description": "Isolation"
          },
          {
            "value": "O01",
            "description": "Oxygen"
          },
          {
            "value": "S01",
            "description": "Safety"
          }
        ]
      },
      {
        "id": "PRECTEXT",
        "value": "",
        "disabled": "true",
        "scrline": "2"
      },
      {
        "id": "PRECACTV",
        "value": "",
        "checked": "false",
        "disabled": "true",
        "scrline": "2"
      },
      {
        "id": "PRECNUM",
        "value": "",
        "disabled": "true",
        "scrline": "2"
      }
    ]
  ],
  "buttons": ""
}