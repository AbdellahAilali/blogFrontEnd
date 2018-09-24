function laodUsers() {
    $.ajax('http://127.0.0.1:8000/userAll', {
        type: 'GET',
        dataType: 'json',

        success: function (data) {
            //je lui demande de supprimer mon tab car quand je rafraichit ma page il apparait en double
            $(data).html('');
            $('#usertable').html('<tr><th scope="col">Lastname</th><' +
                'th scope="col">Firstname</th>' + '<th scope="col">Birthday</th>' +
                '<th scope="col">Action</th></tr>');
            $.each((data), function (i, obj) {

                userFirstname = obj.firstname;
                userLastname = obj.lastname;
                userDate= obj.birthday;

                var tr_html = '';
                tr_html += '<tr>';
                tr_html += '<td class="lastName">' + userLastname + '<input type="hidden" name="id" value="' + obj.id + '"/></td>';
                tr_html += '<td class="firstName">' + userFirstname + '</td>';
                tr_html += '<td class="birthday">' + userDate + '</td>';
                tr_html += '<td class="delete"><a href="#" >delete</a></td>';
                tr_html += '<td class="modify"><a href="#" >modify</a></td>';
                tr_html += '</tr>';

                $('#usertable').append(tr_html);

            });

        },

        error: function (xhr, sts, err) {
            alert('Erreur loaduser!!');
        }
    });

}

/**
 * @param form pour pouvoir l'appeler dan mon index
 */
function createUser(form) {
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

function deleteUser(linkDelete) {
    //je cherche dans l'événement en cour un parent <tr> grace a la méthode closest()
    // dans ce tr je lui demande de trouver un <td> et dans ce <td> un <input>
    // et j'enregistre cette valeur dans ma var id.

    var id = linkDelete.closest("tr").find("td input").val();
    $.ajax({
        url: 'http://127.0.0.1:8000/user_delete/' + id,
        type: 'DELETE',

        success: function () {
            //en cas de succés de recharge la page pour voir la modif
            laodUsers();
        },
        error: function (xhr, sts, err) {
            alert('Erreur delete!!');
        }
    });
}


function fillForm(td) {
    var id = td.closest("tr").find("td input").val();
    var lastname = td.closest("tr").find("td.lastName").text();
    var firstname = td.closest("tr").find("td.firstName").text();
    var birthday = td.closest("tr").find("td.birthday").text();

    $('#form').find('input[name=id]').val(id);
    $('#form').find('input[name=lastname]').val(lastname);
    $('#form').find('input[name=firstname]').val(firstname);
    $('#form').find('input[name=birthday]').val(birthday);
}

function modifyUser(form) {

    var tab = {};
    var id = '';
    $.each(form.serializeArray(), function () {
        tab[this.name] = this.value;
        if (this.name == 'id') {
            id = this.value;
        }
    });     

    $.ajax('http://127.0.0.1:8000/user/modify/'+id, {
        type: 'PUT',
        dataType: 'json',
        data: JSON.stringify(tab),

        success: function () {
            laodUsers();
        },
        error: function () {
            alert('error modify');
        }
    });

}

