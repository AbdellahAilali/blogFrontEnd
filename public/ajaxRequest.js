function laodUsers()
{
    $.ajax('http://127.0.0.1:8000/userAll', {
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            //je lui demande de supprimer mon tab car quand je rafraichit ma page il apparait en double
            $(data).html('');
            $('#usertable').html('<tr><th scope="col">lastname</th><th scope="col">firstname</th><th scope="col">Action</th></tr>');
            $.each((data), function (i, obj) {

                userFirstname = obj.firstname;
                userLastname = obj.lastname;

                var tr_html = '';
                tr_html += '<tr>';
                tr_html += '<td>' + userLastname + '<input type="hidden" name="id" value="' + obj.id + '"/></td>';
                tr_html += '<td>' + userFirstname + '</td>';
                tr_html += '<td class="delete"><a href="#" >ok</a></td>';
                tr_html += '</tr>';

                $('#usertable').append(tr_html);

            });
        },
        error: function (xhr, sts, err) {
            alert('Erreur loaduser!!');
        }
    });

}


function createUser(form)
{
    //je parcoure mon form pour remplir mon objet result
    var result = {};
    //je lui dit que le name de mes input sera la clé du tab et value sa valeur
    $.each(form.serializeArray(), function () {
        result[this.name] = this.value;
    });

    $.ajax('http://127.0.0.1:8000/user', {
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(result),
        success: function () {
            laodUsers();
        },
        error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
        }
    });
}

function deleteUser()
{   //je cherche dans l'événement en cour un parent <tr> grace a la méthode closest()
    //dans ce tr je lui demande de trouver un <td> et dans ce <td> un <input>
    //et j'enregistre cette valeur dans ma var id.
    var id = $(this).closest("tr").find("td input").val();
    $.ajax({
        url: 'http://127.0.0.1:8000/user_delete/' + id,
        type: 'GET',

        success: function() {
            alert("delete user");
        },
        error: function (xhr, sts, err) {
            alert('Erreur delete!!');
        }
    });
}