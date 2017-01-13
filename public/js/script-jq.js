globalDir = '.';

function callDirApi() {
    $.get('v1/getDirectoryData', {url: globalDir}, (data) => {
        
        $('#myDiv').empty();

        let str = '<thead><tr><th>Name</th><th>Type</th></tr></thead><tbody>';

        
        let i = 1;
        for (let val of data) {
            //$('#myDiv').append('<tr>');
            str += '<tr>';

            //$('#myDiv').append(' <td id=td' + i + 
            //'> <a href="#" onclick=onClickFunc() tempName="' + val.name + '" tempType="' + val.type + 
            //'">' + val.name + '</a> </td>');
            
            str += '<td id=td' + i + 
            '> <a href="#" onclick=onClickFunc() tempName="' + val.name + '" tempType="' + val.type + 
            '">' + val.name + '</a> </td>';

            let typeUrl;
            if(val.type == 'file') {
                typeUrl = '/file_img.png';
            } else {
                typeUrl = '/folder_img.jpg';
            }

            //$('#myDiv').append('<td> <img src="' + typeUrl + '" height="25px" width="25px" > </td>');
            i ++;

            //$('#myDiv').append('</tr>');

            str += '<td> <img src="' + typeUrl + '" height="25px" width="25px" > </td>';
            str += '</tr>';
        }

        //$('#myDiv').append('</tbody>');
        //$('#myDiv').append('</table>');

        str += '</tbody></table>';
        $('#myDiv').append(str);
    });
}

callDirApi();

function callFileApi(fileName) {
    //console.log(globalDir + '/' + fileName);
    $.get('v1/getFileData', {url: globalDir}, (data) => {
        console.log(data);
        $('#myDiv').empty();
        $('#myDiv').append('<p id="para">' + data + '</p>');
    });
}

function onClickFunc() {
    //console.log(event.target.getAttribute('temp2'));
    console.log(globalDir);
    if(event.target.getAttribute('tempType') == 'dir') {
        globalDir += '/' + event.target.getAttribute('tempName');
        callDirApi();
    } else {
        globalDir += '/' + event.target.getAttribute('tempName');
        callFileApi();
    }
}

$('#btn-back').click(function() {
    var globalDriArr = [];

    if(globalDir == '.') {
        return;
    }

    globalDirArr = globalDir.split('/');
    globalDirArr.pop();
    globalDir = globalDirArr.join('/');

    console.log("back " + globalDir);
    callDirApi();
});