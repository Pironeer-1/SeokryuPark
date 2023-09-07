let name = 'Daniel';
let letter = "Lorem "+ name +"\n\
\
Ipsum is simply dummy text "+ name +" of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s." + name; 

let letter2 = `Lorem Ipsum ${name} 

is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
${name}`
console.log(letter2);