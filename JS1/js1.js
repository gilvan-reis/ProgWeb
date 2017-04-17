
document.write("<table cellspacing=20><tr>")
for(var i=1; i<=5; i++){
  document.write("<td>")
  document.write("<table border=1><tr><td colspan=2 align=center><b>Produtos de "+i+"</b></td></tr>")
  for(var j=1;j<=10;j++){
    document.write("<tr><td align=center>"+i+"x"+j+"</td><td align=center>"+(i*j)+"</td></tr>")
  }
  document.write("</table></td>")
}
document.write("</tr><tr>")
for(var i=6; i<=10; i++){
  document.write("<td>")
  document.write("<table border=1><tr><td colspan=2 align=center><b>Produtos de "+i+"</b></td></tr>")
  for(var j=1;j<=10;j++){
    document.write("<tr><td align=center>"+i+"x"+j+"</td><td align=center>"+(i*j)+"</td></tr>")
  }
  document.write("</table></td>")
}
document.write("</tr></table>")
