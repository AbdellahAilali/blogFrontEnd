function laodUsers() {
    $.ajax('http://127.0.0.1:8000/userAll', {
        type: 'GET',
        dataType: 'json',
        success: function (data) {

            $(data).html('');
            $.each((data), function (i, obj) {

                userFirstname = obj.firstname;
                userLastname = obj.lastname;
                $('#usertable').append('<tr><td>' + userLastname + '</td>' + '<td>' + userFirstname + '</td></tr>');

            });
        },
        error: function (xhr, sts, err) {
            alert('Erreur !!');
        }
    });

}


function createUser(form) {

    //je parcoure mon form pour remplir mon objet result
    var result = {};
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