function render(template, data){
    let html = '';
    const regex = /\[(.*?)\]/g;
    const matches = template.match(regex);
    
    data.forEach(item =>{
        let temp = template;
        matches.forEach(match => {
            let prop = match.replace('[', '').replace(']', '');
            prop = prop.split('.');
            let value = item[prop[0]];
            for(let i = 1; i < prop.length; i++){
                value = value[prop[i]];
            }
            temp = temp.replace(match, value);
        });
        html += temp;
    })
    return html;
}

