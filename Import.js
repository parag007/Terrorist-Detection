var filename="";
function startread()
{
  var file = document.getElementById('file').files[0];
  if(file)
    {
      gettext(file);}
      filename == file;
    }
  function gettext(readfile)
  {
  var reader;
  try
   {
    reader = new FileReader();
   }catch(e)
   {
    document.getElementById('output').innerHTML = 
    "Error: Not supported on your browser";
    return;
   }
  reader.readAsText(readfile, "UTF-8");
  reader.onload = load;
  reader.onerror = errorhnd;
}
function fileselect()
{
      remove();
      var file = document.getElementById('file').files[0];
      if(file){
       
          alert("File Selected Successfully");
       }
      else{
      
          alert("please select correct file type")
      }}
function load(evt)
{   
  var fileString = evt.target.result;
  var parser = new DOMParser();
  var xml = parser.parseFromString(fileString, "text/xml");
  var data = xmlToJson(xml);
  var data1 = data.documents.document;
  console.log(data1);
  var element = $("div#Display").append("<table id='newTable'></table>");
  $("#newTable").append("<tr> <th>DocID</th> <th>text</th> <th>Date</th> <th>Phone</th><th>Misc</th> </tr>");
  var phone;
  var misc;
  var date;
  data1.forEach(function(d){
   $("#newTable").append("<tr><th>"+d.docID+"</th>  <th>"+d.docText+"</th></tr>");
   $("#newTable").append("<tr>  <th>"+d.docID+"</th>  <th>"+d.docText+"</th> <th>"+d.Date[0]+"</th>  <th></th> <th>Misc</th> </tr>");
  })
}
function errorhnd(evt)
{
  if(evt.target.error.code == evt.target.error.NOT_READABLE_ERR)
{
document.getElementById('output').innerHTML = "Error reading file..."
  }
}
function remove(){
     document.getElementById('output').innerHTML = "Upload file to see the content of the file";
}
function xmlToJson(xml) {
  var obj = {};
  if (xml.nodeType == 1) { 
   if (xml.attributes.length > 0) {
    obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) {
    obj = xml.nodeValue;
  }
  if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
    obj = xml.childNodes[0].nodeValue;
  }
  else if (xml.hasChildNodes()) {
    for(var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof(obj[nodeName]) == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof(obj[nodeName].push) == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}
