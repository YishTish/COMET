webix.ui({
  rows:[
      { view:"template", 
        type:"header", template:"My testing App!" },
      { view:"datatable",
        autoConfig:true,
        editable:true,
        data:[
          {title:"My Fair Lady", year:1964, votes:533848, rating:8.9, rank:5, tags:  'Memorable'},
          {title:"The Wizard of Oz", year:1936, votes:833828, rating:8.5, rank:5, tags: 'Classic', bookmark: '1'}
        ]
      }
  ]
});