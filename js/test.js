

function clearing(clearvar){
    while(clearvar.firstChild){
      clearvar.removeChild(clearvar.firstChild);
    }
}

function addingchild(par,nodetype,textinside,class_name,id_value){
  const node=document.createElement("nodetype");
  const textinnode=document.createTextNode(`${textinside}`);
  node.appendChild(textinnode);
  node.setAttribute('class',`${class_name}`);
  node.setAttribute('id',`${id_value}`);
  par.appendChild(node);
}

export {clearing,addingchild};  