var ROW_CHECKER = 0;
var MAIN_CONTAINER = 'main_container';
var CARD_IDS = {};
var RUNTIME_CARD_ID = "";
var EXISTING_BOT = null;

function add_block() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

function question_type(element){
    var ques_type = element.getAttribute('value');
    console.log(ques_type);
    if (ques_type == "sq"){
        simple_question_block();
    }
    else if(ques_type == "pm"){
        simple_question_block(addon='picture');
    }
    else if(ques_type == "vm"){
        simple_question_block(addon='video');
    }
    else if(ques_type == "dq"){
        simple_question_block(addon='database');
    }
    else if(ques_type == "wq"){
        simple_question_block(addon='welcome');
    }
    
}

function select_options(elem){
    var value = elem.innerHTML;
    var id = elem.getAttribute('id');
    console.log(value);
    console.log(id);
    id = id.split("option")[1];
    document.getElementById("answer_div_inp"+id).innerHTML = value;
    document.getElementById("answer_div_inp"+id).value = value;
}

function simple_question_block(addon=null){
    if(addon=='welcome'){
        var card_id = generateUUID();
        var card_div = document.createElement('div');
        card_div.classList.add('card');
        card_div.id = "card" + card_id;
        var cancel_card = document.createElement('a');
        cancel_card.onclick = function() { close_card(this); };
        cancel_card.id = card_id;
        var cancel_card_icon = document.createElement('i');
        cancel_card_icon.classList.add("fa", "fa-window-close");
        var container_div = document.createElement('div');
        container_div.classList.add('container');
        var q_type = document.createElement('label');
        q_type.classList.add('question-title');
        q_type.innerText = "Welcome Question";
        var q_label = document.createElement('label');
        q_label.innerText = "Question";
        var br = document.createElement('br');
        var q_input = document.createElement('input');
        q_input.type = "text";
        q_input.classList.add('big-input');
        q_input.id = "wq-fq-01";
        cancel_card.appendChild(cancel_card_icon);
        container_div.appendChild(cancel_card);
        container_div.appendChild(q_type);
        container_div.appendChild(document.createElement('br'));
        container_div.appendChild(document.createElement('hr'));
        container_div.appendChild(q_label);
        container_div.appendChild(document.createTextNode( '\u00A0\u00A0' ));
        container_div.appendChild(br);
        container_div.appendChild(q_input);
        card_div.appendChild(container_div);
        var main_container = document.getElementById(MAIN_CONTAINER);
        main_container.appendChild(document.createTextNode( '\u00A0\u00A0' ));
        main_container.appendChild(card_div);
        ROW_CHECKER += 1;
        var question_type_ref = "wq";
        return 0;
    }
    var card_id = generateUUID();                                                       // UUID CARD DIV
    var question_type_ref = "sq";
    CARD_IDS["card"+card_id] = {};
    RUNTIME_CARD_ID = "card"+card_id;
    var card_div = document.createElement('div');
    card_div.classList.add('card');
    card_div.id = "card" + card_id;
    var cancel_card = document.createElement('a');
    cancel_card.onclick = function() { close_card(this); };
    cancel_card.id = card_id;
    var cancel_card_icon = document.createElement('i');
    cancel_card_icon.classList.add("fa", "fa-window-close");
    var container_div = document.createElement('div');
    container_div.classList.add('container');
    var q_type = document.createElement('label');
    if(addon=='picture'){
        q_type.innerText = "Picture Question";    
    }
    else if(addon=='video'){
        q_type.innerText = "Video Question";    
    }
    else if(addon=='database'){
        q_type.innerText = "DataBase Question";    
    }
    else{
        q_type.innerText = "Simple Question";    
    }
    q_type.classList.add('question-title');
    var q_label = document.createElement('label');
    q_label.innerText = "Question";
    var q_label_id_inp = document.createElement('input');
    q_label_id_inp.type = "text";
    q_label_id_inp.placeholder = "id";
    q_label_id_inp.classList.add('inliner');
    q_label_id_inp.id = "q_label_id_inp"+card_id;
    CARD_IDS["card"+card_id]["q_label_id_inp"] = "q_label_id_inp"+card_id;
    var br = document.createElement('br');
    var q_input = document.createElement('input');
    q_input.type = "text";
    q_input.classList.add('big-input');
    q_input.id = "q_input"+card_id;
    CARD_IDS["card"+card_id]["q_input"] = "q_input"+card_id;
    var hr = document.createElement('hr');
    var a_label = document.createElement('label');
    a_label.innerText = "Answers";
    //
    if(addon == 'database'){
        var div1 = document.createElement('div');
        div1.classList.add('btn-group');
        var button = document.createElement('button');
        button.type = "button";
        button.classList.add("btn", "btn-success", "dropdown-toggle");
        button.setAttribute("data-toggle", "dropdown");
        button.setAttribute("aria-haspopup", "true");
        button.setAttribute("aria-expanded", "false");
        button.innerHTML = "Select Database";
        button.id = "answer_div_inp"+card_id;
        var div2 = document.createElement('div');
        div2.classList.add("dropdown-menu");
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                console.log("Data Fetched");
                var results = xhr.response;  
                results = JSON.parse(results);
                results = results.files;
                console.log("RESULTS: ", results);
                for (let m = 0; m < results.length; m++) {
                    var option = document.createElement('a');
                    option.classList.add('dropdown-item');
                    option.innerHTML = results[m];
                    option.onclick = function() { select_options(this); };
                    option.id = "option"+card_id;
                    div2.appendChild(option);
                }
            }
        }
        xhr.open('POST', ip_addr + 'db_files/', true);
        xhr.send(null);
        
        div1.appendChild(button);
        div1.appendChild(div2);
        CARD_IDS["card"+card_id]["answer_div_inp"] = [];
        CARD_IDS["card"+card_id]["answer_div_inp"].push("answer_div_inp"+card_id);
    }
    else{
        var answer_add = document.createElement('a');
        answer_add.id = "answer_add"+card_id;
        answer_add.onclick = function() { add_answer_field(this); };
        // var unique_uuid = generateUUID();                                                       // UUID ANSWER DIV
        var icon = document.createElement('i');
        icon.classList.add("fa", "fa-plus-circle");
        var br2 = document.createElement('br');
        
        var answer_div_inp = document.createElement('input');
        answer_div_inp.type = "text";
        answer_div_inp.classList.add('big-input');
        answer_div_inp.id = "answer_div_inp"+card_id;
        if(addon == "picture"){
            var image_input_answer = document.createElement('input');
            image_input_answer.type = "file";
            image_input_answer.id = "file_upload_answer" + card_id;
            image_input_answer.classList.add('custom-file-upload');
            var image_output_answer = document.createElement('img');
            image_output_answer.id = "uploading_answer" + card_id;
            image_output_answer.style.width = "100px";
            question_type_ref = "pm";
            CARD_IDS["card"+card_id]["answer_div_inp_image"] = [];
            CARD_IDS["card"+card_id]["image_files"] = [];
            CARD_IDS["card"+card_id]["answer_div_inp_image"].push("answer_div_inp_image"+card_id);    
        }
        else if(addon == "video"){
            var image_input_answer = document.createElement('input');
            image_input_answer.type = "file";
            image_input_answer.id = "file_upload_answer" + card_id;
            image_input_answer.classList.add('custom-file-upload');
            var image_output_answer = document.createElement('video');
            image_output_answer.id = "uploading_answer" + card_id;
            image_output_answer.style.width = "200px";
            image_output_answer.setAttribute("controls","controls");
            question_type_ref = "vm";
            CARD_IDS["card"+card_id]["answer_div_inp_image"] = [];
            CARD_IDS["card"+card_id]["image_files"] = [];
            CARD_IDS["card"+card_id]["answer_div_inp_image"].push("answer_div_inp_image"+card_id);    
        }

        CARD_IDS["card"+card_id]["answer_div_inp"] = [];
        CARD_IDS["card"+card_id]["answer_div_inp"].push("answer_div_inp"+card_id);
    }
    var answer_div = document.createElement('div');
    answer_div.id = "div" + card_id;
    
    var answer_div_id_inp = document.createElement('input');
    answer_div_id_inp.type = "text";
    answer_div_id_inp.placeholder = "id";
    answer_div_id_inp.classList.add('inliner');
    answer_div_id_inp.id = "answer_div_id_inp"+card_id;
    CARD_IDS["card"+card_id]["answer_div_id_inp"] = [];
    CARD_IDS["card"+card_id]["answer_div_id_inp"].push("answer_div_id_inp"+card_id);

    
    cancel_card.appendChild(cancel_card_icon);
    container_div.appendChild(cancel_card);
    container_div.appendChild(q_type);
    container_div.appendChild(document.createElement('br'));
    container_div.appendChild(document.createElement('hr'));
    container_div.appendChild(q_label);
    container_div.appendChild(document.createTextNode( '\u00A0\u00A0' ));
    container_div.appendChild(q_label_id_inp);
    container_div.appendChild(br);
    container_div.appendChild(q_input);
    if (addon == "picture"){
        // var img_sec_uuid = generateUUID();                                                       // UUID IMG FILE
        var image_input = document.createElement('input');
        image_input.type = "file";
        image_input.id = "file_upload" + card_id;
        image_input.classList.add('custom-file-upload');
        var image_output = document.createElement('img');
        image_output.id = "uploading" + card_id;
        image_output.style.width = "100px";
        question_type_ref = "pm";
        container_div.appendChild(image_input);
        container_div.appendChild(image_output);
    }
    else if (addon == "video"){
        // var video_sec_uuid = generateUUID();                                                       // UUID VIDEO FILE
        var video_input = document.createElement('input');
        video_input.type = "file";
        video_input.id = "file_upload" + card_id;
        video_input.classList.add('custom-file-upload');
        var video_output = document.createElement('video');
        video_output.id = "uploading" + card_id;
        video_output.style.width = "200px";
        video_output.setAttribute("controls","controls");
        question_type_ref = "vm";
        container_div.appendChild(video_input);
        container_div.appendChild(video_output);
    }
    else if (addon == "database"){
        question_type_ref = "dq";
    }
    CARD_IDS["card"+card_id]['question_type'] = question_type_ref;
    container_div.appendChild(hr);
    container_div.appendChild(a_label);
    
    
    if(addon == "database"){
        answer_div.appendChild(div1);
        answer_div.appendChild(document.createTextNode( '\u00A0' ));
        answer_div.appendChild(answer_div_id_inp);
        container_div.appendChild(answer_div);
    }
    else{
        answer_add.appendChild(icon);
        answer_div.appendChild(answer_div_inp);
        answer_div.appendChild(document.createTextNode( '\u00A0' ));
        answer_div.appendChild(answer_div_id_inp);
        if(addon == "picture"){
            answer_div.appendChild(image_input_answer);
            answer_div.appendChild(image_output_answer);
        }
        else if(addon == "video"){
            answer_div.appendChild(image_input_answer);
            answer_div.appendChild(image_output_answer);
        }
        
        container_div.appendChild(answer_add);
        container_div.appendChild(answer_div);
        container_div.appendChild(br2);
    }
    
    
    card_div.appendChild(container_div);
    if (ROW_CHECKER %3 == 0){
        var main_section = document.getElementById('section');
        var new_container = document.createElement('div');
        new_container.classList.add('container', 'mx-auto', "flex", "px-5", "py-8", "md:flex-row");
        new_container.classList.add('flex-col', "items-center");
        var uuid = generateUUID();                                                       // UUID CONTAINER
        new_container.id = "container" + uuid;
        MAIN_CONTAINER = new_container.id;
        document.getElementById('section').appendChild(new_container);
        console.log("MAIN: "+ MAIN_CONTAINER);
    }
    var main_container = document.getElementById(MAIN_CONTAINER);
    main_container.appendChild(document.createTextNode( '\u00A0\u00A0' ));
    main_container.appendChild(card_div);
    ROW_CHECKER += 1;
    if(addon == "picture"){
        document.getElementById("file_upload"+card_id).addEventListener("change", fileuploadfnimage, true);
        document.getElementById("file_upload_answer"+card_id).addEventListener("change", fileuploadfnanswerimage, true);
    }
    else if(addon == "video"){
        document.getElementById("file_upload"+card_id).addEventListener("change", fileuploadfnvideo, true);
        document.getElementById("file_upload_answer"+card_id).addEventListener("change", fileuploadfnanswervideo, true);
    }
}
 
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function add_answer_field(element){
    var elem = element.getAttribute('id');
    elem = elem.split("answer_add")[1];
    var answer_block = document.getElementById("div"+elem);
    var line_break = document.createElement('br')
    var new_answer_field = document.createElement('input')
    new_answer_field.type = "text";
    new_answer_field.classList.add('big-input');
    var new_id = generateUUID();
    new_answer_field.id = "answer_div_inp"+new_id;

    var answer_div_id_inp = document.createElement('input');
    answer_div_id_inp.type = "text";
    answer_div_id_inp.placeholder = "id";
    answer_div_id_inp.classList.add('inliner');
    answer_div_id_inp.id = "answer_div_id_inp"+new_id;
    

    CARD_IDS["card"+elem]["answer_div_inp"].push("answer_div_inp"+new_id);
    CARD_IDS["card"+elem]["answer_div_id_inp"].push("answer_div_id_inp"+new_id);

    answer_block.appendChild(line_break);
    answer_block.appendChild(new_answer_field);
    answer_block.appendChild(document.createTextNode( '\u00A0' ))
    answer_block.appendChild(answer_div_id_inp);
    if(answer_block.contains(document.getElementById('uploading_answer'+elem))){
        if(document.getElementById('uploading_answer'+elem).nodeName == "IMG"){
            var image_input_answer = document.createElement('input');
            image_input_answer.type = "file";
            image_input_answer.id = "file_upload_answer" + new_id;
            image_input_answer.classList.add('custom-file-upload');
            var image_output_answer = document.createElement('img');
            image_output_answer.id = "uploading_answer" + new_id;
            image_output_answer.style.width = "100px";
            question_type_ref = "pm";
            CARD_IDS["card"+elem]["answer_div_inp_image"].push("answer_div_inp_image"+new_id);
            answer_block.appendChild(image_input_answer);
            answer_block.appendChild(image_output_answer);
            document.getElementById("file_upload_answer"+new_id).addEventListener("change", fileuploadfnanswerimage, true);
        }
        else if(document.getElementById('uploading_answer'+elem).nodeName == "VIDEO"){
            var image_input_answer = document.createElement('input');
            image_input_answer.type = "file";
            image_input_answer.id = "file_upload_answer" + new_id;
            image_input_answer.classList.add('custom-file-upload');
            var image_output_answer = document.createElement('video');
            image_output_answer.id = "uploading_answer" + new_id;
            image_output_answer.style.width = "200px";
            image_output_answer.setAttribute("controls","controls");
            question_type_ref = "vm";
            CARD_IDS["card"+elem]["answer_div_inp_image"].push("answer_div_inp_image"+new_id);
            answer_block.appendChild(image_input_answer);
            answer_block.appendChild(image_output_answer);
            document.getElementById("file_upload_answer"+new_id).addEventListener("change", fileuploadfnanswerimage, true);
        }
    }
    // start_plumb();
}

function close_card(element){
    var elem = element.getAttribute('id');
    // document.getElementById("card"+elem).style.display = "none";
    var close_div = document.getElementById("card"+elem)
    close_div.parentNode.removeChild(close_div);
    ROW_CHECKER = ROW_CHECKER - 1;
    delete CARD_IDS["card"+elem];
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
if (!event.target.matches('.fixedButton')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
    }
    }
}
}

window.onload=function(){
    document.getElementById("main_heading").innerHTML = sessionStorage.getItem('botname');
  }

function fileuploadfnimage(evt){
    var image_id = evt.target.id.split("file_upload")[1];
    var img_sec = document.getElementById("uploading"+image_id);
    var files = evt.target.files;
    console.log(img_sec, files);
    var fr = new FileReader();
    fr.onload = function () {
        img_sec.src = fr.result;
        console.log(CARD_IDS["card"+image_id]);
        CARD_IDS["card"+image_id]["image_file"] = fr.result;
        img_sec.classList.add('img-boundary');
    }
    fr.readAsDataURL(files[0]);
}
function fileuploadfnanswerimage(evt){
    var image_id = evt.target.id.split("file_upload_answer")[1];
    var img_sec = document.getElementById("uploading_answer"+image_id);
    var files = evt.target.files;
    console.log(img_sec, files);
    var fr = new FileReader();
    fr.onload = function () {
        img_sec.src = fr.result;
        var parent_id = img_sec.parentNode.id.split('div')[1];
        CARD_IDS["card"+parent_id]["image_files"].push(fr.result);
        img_sec.classList.add('img-boundary');
    }
    fr.readAsDataURL(files[0]);
}

function fileuploadfnvideo(evt){
    var video_id = evt.target.id.split("file_upload")[1];
    var video_sec = document.getElementById("uploading"+video_id);
    var files = evt.target.files;
    console.log(video_sec, files);
    var fr = new FileReader();
    fr.onload = function () {
        video_sec.src = fr.result;
        CARD_IDS["card"+video_id]["image_file"] = fr.result;
        video_sec.classList.add('img-boundary');
    }
    fr.readAsDataURL(files[0]);
}
function fileuploadfnanswervideo(evt){
    var video_id = evt.target.id.split("file_upload_answer")[1];
    var video_sec = document.getElementById("uploading_answer"+video_id);
    var files = evt.target.files;
    console.log(video_sec, files);
    var fr = new FileReader();
    fr.onload = function () {
        video_sec.src = fr.result;
        var parent_id = video_sec.parentNode.id.split('div')[1];
        CARD_IDS["card"+parent_id]["image_files"].push(fr.result);
        video_sec.classList.add('img-boundary');
    }
    fr.readAsDataURL(files[0]);
}

function save_changes(){
    if(CARD_IDS.length == undefined){
        CARD_IDS_CLONE = [CARD_IDS];
    }
    var formdata = [];
    
    console.log(CARD_IDS_CLONE, CARD_IDS_CLONE.length);
    for (var key of Object.keys(CARD_IDS_CLONE[0])) {
        var formdict = {"question" : "", "question_id" : "", "answers" : [], "answers_id" : [], "question_type" : "", "qmedia" : "", "amedia": []};
        formdict["question"] = document.getElementById(CARD_IDS_CLONE[0][key]["q_input"]).value;
        formdict["question_id"] = document.getElementById(CARD_IDS_CLONE[0][key]["q_label_id_inp"]).value;
        for (let i = 0; i < CARD_IDS_CLONE[0][key]["answer_div_inp"].length; i++) {
            formdict['answers'].push(document.getElementById(CARD_IDS_CLONE[0][key]["answer_div_inp"][i]).value)
        }
        
        for (let i = 0; i < CARD_IDS_CLONE[0][key]["answer_div_id_inp"].length; i++) {
            formdict['answers_id'].push(document.getElementById(CARD_IDS_CLONE[0][key]["answer_div_id_inp"][i]).value)
        }
        formdict["question_type"] = CARD_IDS_CLONE[0][key]["question_type"];
        if(formdict["question_type"] == "pm" || formdict["question_type"] == "vm"){
            if(CARD_IDS_CLONE[0][key]["image_file"] != undefined){
                formdict["qmedia"] = CARD_IDS_CLONE[0][key]["image_file"];
            }
        }
        if(formdict["question_type"] == "pm" || formdict["question_type"] == "vm"){
            for (let i = 0; i < CARD_IDS_CLONE[0][key]["answer_div_inp"].length; i++) {
                // try{
                if(CARD_IDS_CLONE[0][key]["image_files"][i] != undefined){
                    formdict["amedia"].push(CARD_IDS_CLONE[0][key]["image_files"][i]);//
                }
                else{
                    formdict["amedia"].push("");
                }
                // }
                // catcvh{
                //     formdict["amedia"].push("");//
                // }
            }
        }
        formdata.push(formdict);
    }
    try{
        var first_question = document.getElementById("wq-fq-01").value;
        if(!first_question){
            alert("Cannot Make Bot without Welcome Question");
            throw new Error("Incorrect or Empty Information");
        }
        else{
            comp_form_data = {"botname" : sessionStorage.getItem('botname'), "details" : formdata, "first_question" : first_question};
        }
    }
    catch{
        alert("Cannot Make Bot without Welcome Question");
        throw new Error("Incorrect or Empty Information");
    }
    // formdata.push({"botname" : sessionStorage.getItem('botname')});
    
    console.log(formdata);
    xhr = new XMLHttpRequest();
    xhr.open( 'POST', ip_addr + 'makebot/', false );
    xhr.onreadystatechange = function ( response ) {
        if (xhr.readyState === 4) {
        var reponses = xhr.response;
        reponses = JSON.parse(reponses);
        console.log('reponse ' + reponses.status);
        var chat = confirm("Changes Saves. Do you want to chat?");
        if(chat == true){
            window.location = "chatbox.html";
        }
        else{
            window.location = "botadd.html";
        }
        }
    };
    xhr.send( JSON.stringify(comp_form_data) );
}















// *************
// Index Page Codes
// *************
function verify_bot_name(){
    var bot_name = document.getElementById('bot-name').value;
    if(!bot_name){
        var label = document.getElementById('name-log');
        label.innerText = "Bot name cannot be empty.";
        label.style.color = "red";
        label.style.display = "block";
        return 0;
    }
    bot_name = {"botname" : bot_name, "username": sessionStorage.getItem('username')};
    xhr = new XMLHttpRequest();
    xhr.open( 'POST', ip_addr + 'registerbot/', false );
    xhr.onreadystatechange = function ( response ) {
        if (xhr.readyState === 4) {
        var reponses = xhr.response;
        reponses = JSON.parse(reponses);
        console.log('reponse ' + reponses.status, typeof reponses.status);
        if(reponses.status == 1){
            var label = document.getElementById('name-log');
            label.innerText = "Bot name registered successfuly";
            label.style.color = "green";
            label.style.display = "block";
            sessionStorage.setItem("botname" , bot_name['botname']);
            EXISTING_BOT = "bot.html";
            document.getElementById("go-to-bot").style.display = "block";
            document.getElementById("go-to-chat").style.display = "none";
            // window.location = "bot.html";
        }
        else if(reponses.status == 2){
            var label = document.getElementById('name-log');
            label.innerText = "Bot name is registered with some other user, try another name.";
            label.style.color = "red";
            label.style.display = "block";
            sessionStorage.setItem("botname" , bot_name['botname']);
            EXISTING_BOT = "botadd.html";
            document.getElementById("go-to-bot").style.display = "none";
            document.getElementById("go-to-chat").style.display = "none";
            // window.location = "bot.html";
        }
        else{
            var label = document.getElementById('name-log');
            label.innerText = "Bot name already exists";
            label.style.color = "red";
            label.style.display = "block";
            document.getElementById("go-to-bot").style.display = "block";
            document.getElementById("go-to-chat").style.display = "block";
            document.getElementById("go-to-user-chat").style.display = "block";
            sessionStorage.setItem("botname" , bot_name['botname']);
            EXISTING_BOT = "botexist.html";
        }
        }
    };
    xhr.send( JSON.stringify(bot_name) );
}
function go_to_bot(){
    if(EXISTING_BOT){
        window.location = EXISTING_BOT;
    }
}
function go_to_chat(){
    window.location = "chatbox.html";
}

function go_to_user_chat(){
    window.location = "user_data.html";
}