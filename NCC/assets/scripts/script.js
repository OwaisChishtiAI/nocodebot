function add_block() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

function question_type(element){
    var ques_type = element.getAttribute('value');
    console.log(ques_type);
}

function simple_question_block(){
    var card_div = document.createElement('div');
    card_div.classList.add('card');
    var container_div = document.createElement('div');
    container_div.classList.add('container');
    var q_label = document.createElement('label');
    var br = document.createElement('br');
    var q_input = document.createElement('input');
    q_input.type = "text";
    var hr = document.createElement('hr');
    var a_label = document.createElement('label');
    var answer_add = document.createElement('a');
    answer_add.onclick = "add_answer_field()";
    var icon = document.createElement('i');
    icon.classList.add("fa fa-plus-circle");

}
  

function add_answer_field(){
    var answer_block = document.getElementById('answer_fields');
    var line_break = document.createElement('br')
    var new_answer_field = document.createElement('input')
    new_answer_field.type = "text";
    answer_block.appendChild(line_break);
    answer_block.appendChild(new_answer_field);
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