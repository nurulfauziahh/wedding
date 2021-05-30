
const database = firebase.firestore();
const userCollection = database.collection('Kategori');
var statusAdd = false;

$("#add-kategori-button").click(function(){
  var kategori = {
    namaKat: $("#namaKategoriAdd").val(),
    gambarKat: $("#gambarKategoriAdd").val(),
    // tanggal: firebase.firestore.FieldValue.serverTimestamp(),
  }
  addKategori(kategori);
  console.log("berhasil ditambahkan");
  statusAdd = true;
  // if(statusAdd){
  //   window.location.href = window.location.href;
  // }

});


function addKategori(h){
  firebase.firestore().collection("Kategori").add(h);
  
}

// Clear modal
let template = null;
    $('.modal').on('show.bs.modal', function(event) {
      template = $(this).html();
    });

    $('.modal').on('hidden.bs.modal', function(e) {
      $(this).html(template);
    });


    // function detailShow(id) {
    //   const database = firebase.firestore();
    //   const userCollection = database.collection('Campaign');
    //   userCollection.doc(id).get()
    //     .then(campaigns => {
    //       campaign = campaigns.data();
    //       if (campaigns.exists)
    //         document.getElementById("detailSection").innerHTML += `
    //     <img class="card-img-top" src="${campaign.gambarCampaign}" alt="Card image cap">
    //     <div class="card-body">
    //       <h4 class="card-title">${campaign.namaCampaign}</h4>
    //       <p class="card-text kategori"> Kategori ${campaign.kategori}</p>
    //       <p class="card-text dana">Dana yang terkumpul Rp.${campaign.danaTerkumpul} dari Rp.${campaign.danaCampaign}</p>
    //       <p class="deskTitle">Deskripsi :</p>
    //       <p class="card-text">${campaign.deskripsi}</p>
    //     </div>
    //   </div>
        
    // `
    //       else
    //         console.log('Campaign does not exist !');
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    // }

function readKategori() {
  firebase.firestore().collection("Kategori").onSnapshot(function (snapshot) {
    document.getElementById("table").innerHTML = `<thead class="thead-dark">
        <tr>
        <th scope="col">#</th>
        <th scope="col">Nama Kategori</th>
        <th scope="col">Gambar</th>
        <th scope="col">Action</th>
      </tr>
    </thead>`;
    var i =1;
    snapshot.forEach(function (kategoriValue) {
      var kategori = kategoriValue.data();
      document.getElementById("table").innerHTML += `
            <tbody>
            <tr>
              <th scope="row">${i++}</th>
              <td class="card-title nama">${kategori.namaKat}</td>
              <td class="name"><img class="card-img-top" src="${kategori.gambarKat}" alt="Card image cap"></td>
              <td class="gambar" style="display:none"><p>${kategori.gambarKat}</p></td>             
              <td>
                   <button type="button" id="detail-btn"  class="btn btn-success" onclick="detailShow('${kategoriValue.id}')" data-toggle="modal" data-target="#detailModal">Details</button>
                  <button type="button" id="edit-kategori-btn" data-heroId="${kategoriValue.id}" class="btn btn-success edit-kategori-btn" data-toggle="modal" data-target="#editModal">Edit</button>
                  <button type="submit" class="btn btn-success" onclick="deleteCamp('${kategoriValue.id}')">Hapus</button>
              </td>
            </tr>
          </tbody>
`

    });
  });
}

function deleteCamp(id){
  firebase.firestore().collection("Kategori").doc(id).delete().then(() => {
    console.log("data dihapus");
  });
}

$(document).on('click', '.edit-kategori-btn', function(){
  var kategoriId = $(this).attr('data-heroId');
  console.log("you click " + kategoriId);
  $('#kategoriId').val(kategoriId);


  var nama = $(this).closest('tr').find('.nama').text();
  $('#namaKategoriEdit').val(nama);

  var gambar = $(this).closest('tr').find('.gambar').text();
  $('#gambarKategoriEdit').val(gambar);


});


$('#edit-kategori-button').click(function(){
  const database = firebase.firestore();
  const userCollection = database.collection('Kategori');
   const idKat = $('#kategoriId').val();
        userCollection.doc(idKat).update({
          namaKat: $("#namaKategoriEdit").val(),
          gambarKat : $("#gambarKategoriEdit").val(),
        //   tanggal: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {console.log('Data Successfully');})
        .catch(error  => {console.error(error)});
 
});


function uploadImageAdd() {
  const ref = firebase.storage().ref()

  const file = document.querySelector("#photoAdd").files[0]

  const name = new Date() + '-' + file.name

  const metadata = {
    contentType: file.type
  }

  const task = ref.child(name).put(file, metadata)

  task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {

      alert("Image Upload Successful")
      const image = document.querySelector('#imageAdd')
      image.src = url
      document.getElementById("gambarKategoriAdd").value = url

    })
}


function uploadImageEdit() {
  const ref = firebase.storage().ref()

  const file = document.querySelector("#photoEdit").files[0]

  const name = new Date() + '-' + file.name

  const metadata = {
    contentType: file.type
  }

  const task = ref.child(name).put(file, metadata)

  task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(urlEdit => {

      alert("Image Upload Successful")
      const imageEdit = document.querySelector('#imageEdit')
      imageEdit.src = urlEdit
      document.getElementById("gambarKategoriEdit").value = urlEdit

    })
}