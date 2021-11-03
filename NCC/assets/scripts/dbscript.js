function add_db_file(){
    var db_file = document.getElementById('db_file').files[0];
    // alert(db_file);
    const comp_form_data = new FormData();
    comp_form_data.append("file", db_file);
    // comp_form_data.append('db_name', db_name);
    // comp_form_data.append('db_file', db_file);
    xhr = new XMLHttpRequest();
    xhr.open( 'POST', ip_addr + 'getfiles/', false );
    xhr.onreadystatechange = function ( response ) {
        if (xhr.readyState === 4) {
        var reponses = xhr.response;
        reponses = JSON.parse(reponses);
        console.log('reponse ' + reponses.status);
        location.reload();
        }
    };
    xhr.send( comp_form_data );
}

window.onload=function(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
        // callback(xhr.response);
            console.log("Data Fetched");
            var results = xhr.response;  
            results = JSON.parse(results);
            console.log("RESULTS: ", results);

            function addCell(tr, text, last=false, btn_id=null) {
                function DeleteClick(event){
                    var del = confirm("Are you sure, you want to delete this?")
                    if(del){
                        console.log("DELETE" + event.target.id)
                        var xhr2 = new XMLHttpRequest();
                        xhr2.open( 'POST', ip_addr + 'del_db_files/', false );
                        xhr2.onreadystatechange = function ( response ) {};
                        // order_id_form = new FormData();
                        console.log(results.files[event.target.id - 1]);
                        // order_id_form.append('filename', results.files[event.target.id - 1]);
                        xhr2.send(JSON.stringify({"filename" : results.files[event.target.id - 1]}));
                    }
                    else{
                        console.log("NOT DELETE" + event.target.id)
                    }
                }

                if (last == true) {
                    var btn3 = document.createElement('input');

                    var td = tr.insertCell();


                    btn3.type = "button";
                    btn3.id = btn_id
                    btn3.className = "text-white bg-red-600 border-0 py-2 px-8 focus:outline-none hover:bg-red-400 rounded text-lg";
                    btn3.value = "Delete";
                    btn3.onclick = DeleteClick;
                    td.appendChild(btn3);


                    return td;
                }
                else{
                    var td = tr.insertCell();
                    td.textContent = text;
                    return td;
                }
            }  

            var i = 1;
            var Table = document.getElementById("files_table");
            Table.innerHTML = "<tr><td><b>#</b></td><td><b>Database File</b></td><td><b>Actions</b></td></tr>";
            // var table_cols = ["TimeStamp", "Agent Name", "Order ID", "Actions"]
            // for(var a = 0; a < 4; a++){

            // }
            for(var j = 0; j < results.files.length; j++){
                var row = Table.insertRow();
                var item = results.files[j];
                addCell(row, i);
                addCell(row, item);
                addCell(row, "", last=true, btn_id=i);
                i = i + 1;
                }
                
        }
    }
    xhr.open('POST', ip_addr + 'db_files/', true);
    xhr.send(null);
  }