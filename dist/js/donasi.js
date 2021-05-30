
const database = firebase.firestore();
const userCollection = database.collection('Campaign');
var statusAdd = false;
var campaign;

function myFunction() {{
  var input, filter, table, tr, td, i ,alltables;
  alltables = document.querySelectorAll("table");
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  alltables.forEach(function(table){{
      tr = table.getElementsByTagName("tr"),
      th = table.getElementsByTagName("th");
  
      for (i = 1; i < tr.length; i++) {{
              tr[i].style.display = "none";
              for(var j=0; j<th.length; j++){{
          td = tr[i].getElementsByTagName("td")[j];      
          if (td) {{
              if (td.innerHTML.toUpperCase().indexOf(filter.toUpperCase()) > -1){{
                  tr[i].style.display = "";
                  break;
              }}
          }}
      }} 
  }}     
  }})
  }}

function readUser() {
  firebase.firestore().collection("kehadiran").onSnapshot(function (snapshot) {
    document.getElementById("table").innerHTML = `<thead class="thead-dark">
        <tr>
        <th scope="col" width="70 px">#</th>
        <th scope="col" width="350 px">Nama Tamu</th>
        <th scope="col" width="120 px">Shift</th>
        <th scope="col" width="150 px">Id Tamu</th>
        <th scope="col" width="170 px">Status kehadiran</th>
        <th scope="col">Action</th>
      </tr>
    </thead>`;
    var i = 1;
    snapshot.forEach(function (kehadiranValue) {
      var kehadiran = kehadiranValue.data();
      document.getElementById("table").innerHTML += `
            <tbody>
            <tr>
              <th scope="row">${i++}</th>
              <td class="card-title nama">${kehadiran.nama}</td>
              <td class= "shift">${kehadiran.shift}</td>
              <td class="idTamu">${kehadiran.idTamu}</td>
              <td class="hadir">${kehadiran.hadir}</td>
              
           
              <td>
                  <button type="button" id="edit-campaign-btn" data-heroId="${kehadiranValue.id}" class="btn btn-success edit-campaign-btn" data-toggle="modal" data-target="#editModal">Hadir</button>
                  
              </td>
            </tr>
          </tbody>
`
    });
  });
}

{/* <td class= "tanggal">${Date(kehadiran.tanggal)}</td> */}

// function readUser() {
//   firebase.firestore().collection("person2").onSnapshot(function (snapshot) {
//     document.getElementById("table").innerHTML = `<thead class="thead-dark">
//         <tr>
//         <th scope="col" width="50 px">#</th>
//         <th scope="col">Nama Tamu</th>
//         <th scope="col">Occupation</th>
//         <th scope="col">Shift</th>
//         <th scope="col">Kehadiran</th>
//         <th scope="col">Action</th>
//       </tr>
//     </thead>`;
//     var i = 1;
//     snapshot.forEach(function (personValue) {
//       var person = personValue.data();
//       document.getElementById("table").innerHTML += `
//             <tbody>
//             <tr>
//               <th scope="row">${i++}</th>
//               <td class="card-title nama">${person.nama}</td>
//               <td class="occupation">${person.occupation}</td>
//               <td class= "shift">${person.shift}</td>
//               <td class= "kehadiran" >${person.kehadiran}</td>
//               <td>
//                   <button type="button" id="edit-campaign-btn" data-heroId="${personValue.id}" class="btn btn-success edit-campaign-btn" data-toggle="modal" data-target="#editModal">Hadir</button>
                  
//               </td>
//             </tr>
//           </tbody>
// `
//     });
//   });
// }


// $(document).on('click', '.edit-campaign-btn', function () {
//   var campaignId = $(this).attr('data-heroId');
//   console.log("you click " + campaignId);
//   $('#campaignId').val(campaignId);

//   const database = firebase.firestore();
//       const userCollection = database.collection('person2');
//       userCollection.doc(campaignId).get()
//         .then(persons => {
//           person = persons.data();
//           if (persons.exists)
//             document.getElementById("firstSection").innerHTML += `
//           <p><b>${person.nama}</b>, dikonfirmasi hadir ?</p>`


//   var nama = $(this).closest('tr').find('.nama').text();
//   $('#namaCampaignEdit').val(nama);

//   var dana = $(this).closest('tr').find('.occupation').text();
//   $('#danaCampaignEdit').val(dana);

//   var deskripsi = $(this).closest('tr').find('.shift').text();
//   $('#deskripsiEdit').val(deskripsi);

//   var kehadiran = $(this).closest('tr').find('.kehadiran').text();
//   $('#kehadiranEdit').val(kehadiran);


// });

// });

// $('#edit-campaign-button').click(function(){
//   const database = firebase.firestore();
//   const userCollection = database.collection('person2');
//   const id = $('#campaignId').val();
//   userCollection.doc(id).update({
//     nama: $('#namaCampaignEdit').val(),
//     occupation: $('#danaCampaignEdit').val(),
//     shift: $('#deskripsiEdit').val(),
//     kehadiran: "hadir",
//   })
//     .then(() => { console.log('Data Successfully');
  
//     document.location.href = '../dist/donasi.html';
//   })
//     .catch(error => { console.error(error) });
    
 
// }

// );


$(document).on('click', '.edit-campaign-btn', function () {
  var campaignId = $(this).attr('data-heroId');
  console.log("you click " + campaignId);
  $('#campaignId').val(campaignId);

  const database = firebase.firestore();
      const userCollection = database.collection('kehadiran');
      userCollection.doc(campaignId).get()
        .then(persons => {
          person = persons.data();
          if (persons.exists)
            document.getElementById("firstSection").innerHTML += `
          <p><b>${person.nama}</b>, dikonfirmasi hadir ?</p>`


  var idTamu = $(this).closest('tr').find('.idTamu').text();
    $('#danaCampaignEdit').val(idTamu);

  var nama = $(this).closest('tr').find('.nama').text();
  $('#namaCampaignEdit').val(nama);

  var deskripsi = $(this).closest('tr').find('.shift').text();
  $('#deskripsiEdit').val(deskripsi);

  // var kehadiran = $(this).closest('tr').find('.kehadiran').text();
  // $('#kehadiranEdit').val(kehadiran);


});

});

$('#edit-campaign-button').click(function(){
  const database = firebase.firestore();
  const userCollection = database.collection('kehadiran');
  const id = $('#campaignId').val();
  userCollection.doc(id).update({
    idTamu: $('#danaCampaignEdit').val(),
    nama: $('#namaCampaignEdit').val(),
    shift: $('#deskripsiEdit').val(),
    hadir: "hadir",
    tanggal : firebase.firestore.FieldValue.serverTimestamp()
  })
    .then(() => { console.log('Data Successfully');
  
    document.location.href = '../dist/wedding.html';
  })
    .catch(error => { console.error(error) });
    
 
}

);

function updateKehadiran(id) {
  const database = firebase.firestore();
  const userCollection = database.collection('person2');
  var nama = $(this).closest('tr').find('.nama').text();
  var occupation = $(this).closest('tr').find('.occupation').text();
  var shift = $(this).closest('tr').find('.shift').text();
  userCollection.doc(id).update({
    nama: nama.toString(),
    occupation: occupation.toString(),
    shift: shift.toString(),
    kehadiran: "Hadir",
  })
    .then(() => { console.log('Data Successfully'); })
    .catch(error => { console.error(error) });

}

let template = null;
    $('.modal').on('show.bs.modal', function(event) {
      template = $(this).html();
    });

    $('.modal').on('hidden.bs.modal', function(e) {
      $(this).html(template);
    });
