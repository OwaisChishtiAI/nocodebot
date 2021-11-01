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
    
}

function simple_question_block(addon=null){
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
    var answer_add = document.createElement('a');
    answer_add.id = "answer_add"+card_id;
    answer_add.onclick = function() { add_answer_field(this); };
    // var unique_uuid = generateUUID();                                                       // UUID ANSWER DIV
    var icon = document.createElement('i');
    icon.classList.add("fa", "fa-plus-circle");
    var br2 = document.createElement('br');
    var answer_div = document.createElement('div');
    answer_div.id = "div" + card_id;
    var answer_div_inp = document.createElement('input');
    answer_div_inp.type = "text";
    answer_div_inp.classList.add('big-input');
    answer_div_inp.id = "answer_div_inp"+card_id;
    CARD_IDS["card"+card_id]["answer_div_inp"] = [];
    CARD_IDS["card"+card_id]["answer_div_inp"].push("answer_div_inp"+card_id);
    var answer_div_id_inp = document.createElement('input');
    answer_div_id_inp.type = "text";
    answer_div_id_inp.placeholder = "id";
    answer_div_id_inp.classList.add('inliner');
    answer_div_id_inp.id = "answer_div_id_inp"+card_id;
    CARD_IDS["card"+card_id]["answer_div_id_inp"] = [];
    CARD_IDS["card"+card_id]["answer_div_id_inp"].push("answer_div_id_inp"+card_id);

    answer_div.appendChild(answer_div_inp);
    answer_div.appendChild(document.createTextNode( '\u00A0' ));
    answer_div.appendChild(answer_div_id_inp);
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
    CARD_IDS["card"+card_id]['question_type'] = question_type_ref;
    container_div.appendChild(hr);
    container_div.appendChild(a_label);
    answer_add.appendChild(icon);
    container_div.appendChild(answer_add);
    container_div.appendChild(br2);
    container_div.appendChild(answer_div);
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
    }
    else if(addon == "video"){
        document.getElementById("file_upload"+card_id).addEventListener("change", fileuploadfnvideo, true);
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
    if(element instanceof Element){
        var elem = element.getAttribute('id');
        elem = elem.split("answer_add")[1];
    }
    else{
        var elem = element;
    }
    
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
    var botname = sessionStorage.getItem('botname');
    document.getElementById("main_heading").innerHTML = botname;
    xhr = new XMLHttpRequest();
    xhr.open( 'POST', ip_addr + 'getbot/', false );
    xhr.onreadystatechange = function ( response ) {
        if (xhr.readyState === 4) {
        var responses = xhr.response;
        responses = JSON.parse(responses);
        console.log(responses);
        for (let index = 0; index < responses.question_type.length; index++) {
            if(responses.question_type[index] == "sq"){
                simple_question_block()
            }
            else if(responses.question_type[index] == "pm"){
                simple_question_block(addon='picture')
            }
            else if(responses.question_type[index] == "vm"){
                simple_question_block(addon='video')
            }
            var keys = [];
            for(var key of Object.keys(CARD_IDS)){
                keys.push(key);
            }
            console.log(keys);
            var this_block_id = keys[keys.length-1];
            this_block_id = this_block_id.split('card')[1];

            for (let i = 0; i < responses.answers_id[index].length-1; i++) {
                add_answer_field(this_block_id);
            }
            
            console.log(this_block_id);
            document.getElementById(CARD_IDS["card"+this_block_id]["q_input"]).value = responses.question[index];
            document.getElementById(CARD_IDS["card"+this_block_id]["q_label_id_inp"]).value = responses.question_id[index];
            for (let j = 0; j < CARD_IDS["card"+this_block_id]["answer_div_inp"].length; j++) {
                document.getElementById(CARD_IDS["card"+this_block_id]["answer_div_inp"][j]).value = responses.answers[index][j];
                document.getElementById(CARD_IDS["card"+this_block_id]["answer_div_id_inp"][j]).value = responses.answers_id[index][j];
            }
            if(CARD_IDS["card"+this_block_id]["question_type"] != "sq"){
                document.getElementById("uploading"+this_block_id).src = responses.media[index];
            }
        } // END of MAIN FOR LOOP
        console.log(CARD_IDS);
        }
    };
    xhr.send( JSON.stringify({"botname" : botname}) );
  }

function fileuploadfnimage(evt){
    var image_id = evt.target.id.split("file_upload")[1];
    var img_sec = document.getElementById("uploading"+image_id);
    var files = evt.target.files;
    console.log(img_sec, files);
    var fr = new FileReader();
    fr.onload = function () {
        img_sec.src = fr.result;
        CARD_IDS["card"+image_id]["image_file"] = fr.result;
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

function save_changes(){
    if(CARD_IDS.length == undefined){
        CARD_IDS_CLONE = [CARD_IDS];
    }
    var formdata = [];
    
    console.log(CARD_IDS_CLONE, CARD_IDS_CLONE.length);
    for (var key of Object.keys(CARD_IDS_CLONE[0])) {
        var formdict = {"question" : "", "question_id" : "", "answers" : [], "answers_id" : [], "question_type" : "", "media" : ""};
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
                formdict["media"] = CARD_IDS_CLONE[0][key]["image_file"];
            }
        }
        formdata.push(formdict);
    }
    comp_form_data = {"botname" : sessionStorage.getItem('botname'), "details" : formdata}
    // formdata.push({"botname" : sessionStorage.getItem('botname')});
    
    console.log(formdata);
    xhr = new XMLHttpRequest();
    xhr.open( 'POST', ip_addr + 'updatebot/', false );
    xhr.onreadystatechange = function ( response ) {
        if (xhr.readyState === 4) {
        var reponses = xhr.response;
        reponses = JSON.parse(reponses);
        console.log('reponse ' + reponses.status);
        var chat = confirm("Changes Saves. Do you want to chat?");
        if(chat == true){
            window.location = "chatbox.html";
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
    bot_name = {"botname" : bot_name};
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
            // window.location = "bot.html";
        }
        else{
            var label = document.getElementById('name-log');
            label.innerText = "Bot name already exists";
            label.style.color = "red";
            label.style.display = "block";
            document.getElementById("go-to-bot").style.display = "block";
            document.getElementById("go-to-chat").style.display = "block";
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