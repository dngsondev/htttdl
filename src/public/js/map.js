(function() { 
  window.onload = function() {
    // Kinh độ và vĩ độ mặc định
    var kinhdo = 9.915305180107284; 
    var vido = 105.14689066544706; 

    // Tạo MapOptions
    var options = {
      zoom: 15,
      center: new google.maps.LatLng(kinhdo, vido),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Tạo bản đồ
    var map = new google.maps.Map(document.getElementById('map'), options);

    // Lấy modal và nút đóng
    var modal = document.getElementById("locationModal");
    var span = document.getElementsByClassName("close")[0];

    // Hàm thêm marker vào bản đồ
    function addMarker(location, storeInfo, open) {
      var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: storeInfo ? storeInfo.tenCH : 'Marker'
      });
    
      // Tạo InfoWindow một lần để tái sử dụng
      var infowindow = new google.maps.InfoWindow();
    
      // Hàm để hiển thị InfoWindow với nội dung từ storeInfo
      function showInfoWindow() {
        var contentString = `
          <div>
            <div style="float: left;">
              <img style="width: 100px; height: 100px;" src="../../images/${storeInfo.hinhAnhCH}" alt="${storeInfo.tenCH}">
            </div>
            <div style="float: right; margin-left: 10px; line-height: 20px">
              <div>Tên: ${storeInfo.tenCH}</div>
              <div>Địa Chỉ: ${storeInfo.diaChiCH}</div>
              <div>Kinh độ: ${storeInfo.kinhdo}</div>
              <div>Vĩ độ: ${storeInfo.vido}</div>
              <div>Mô tả: ${storeInfo.moTaCH}</div>
            </div>
          </div>
          <div class="row" style="display: flex; justify-content: center; gap: 15px; padding-top: 10px;">
            <a href="/statistical?maCH=${storeInfo.maCH}&tenCH=${storeInfo.tenCH}" 
              style="padding: 10px 20px; background-color: #00b359; color: white; border-radius: 5px;">Thống kê</a>
            <button id="editButton" style="padding: 10px 20px; background-color: blue; color: white; border-radius: 5px; border: none;">Chỉnh sửa</button>
            <a href="/map/delete?maCH=${storeInfo.maCH}" 
              style="padding: 10px 20px; background-color: red; color: white; border-radius: 5px;">Xoá</a>
          </div>
        `;
      
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
      
        // Trì hoãn gán sự kiện để đảm bảo phần tử đã có trong DOM
        setTimeout(function() {
          var editButton = document.getElementById('editButton');
          if (editButton) {
            editButton.addEventListener('click', function() {
              openEditModal(storeInfo);
            });
          }
        }, 100); // Trì hoãn 100ms
      }
      

    
      // Nếu open === true, mở InfoWindow ngay lập tức
      if (open) {
        showInfoWindow();
      }
    
      // Thêm sự kiện 'click' để mở InfoWindow khi người dùng nhấp vào marker
      google.maps.event.addListener(marker, 'click', showInfoWindow);
    }

    // Hàm mở modal chỉnh sửa
    function openEditModal(storeInfo) {
      var editModal = document.getElementById('editModal');
      editModal.style.display = "block";


      // Điền thông tin của cửa hàng vào các trường input
      document.getElementById('editmaCH').value = storeInfo.maCH;
      document.getElementById('editNameCH').value = storeInfo.tenCH;
      document.getElementById('editAddressCH').value = storeInfo.diaChiCH;
      document.getElementById('editLatitude').value = storeInfo.kinhdo;
      document.getElementById('editLongitude').value = storeInfo.vido;
      console.log(storeInfo.hinhAnhCH)
      document.getElementById('tenPic').value = storeInfo.hinhAnhCH;
      document.getElementById('editDescription').value = storeInfo.moTaCH;

      // Khi người dùng nhấn nút lưu, cập nhật thông tin cửa hàng
      document.getElementById('saveEdit').onclick = function() {
        editModal.style.display = "none";
      };
    }

    // Đóng modal khi nhấn vào nút đóng
    var closeEditButton = document.getElementsByClassName("closeEdit")[0];
    closeEditButton.onclick = function() {
      document.getElementById('editModal').style.display = "none";
    };
    

    // Đóng modal khi nhấn ra ngoài modal
    window.onclick = function(event) {
      if (event.target == document.getElementById('editModal')) {
        document.getElementById('editModal').style.display = "none";
      }
    };


    // Thêm sự kiện click vào bản đồ
    google.maps.event.addListener(map, 'click', function(event) {
      var lat = event.latLng.lat();
      var lng = event.latLng.lng();

      // Hiển thị modal và điền thông tin
      modal.style.display = "block";
      document.getElementById('latitude').value = lat;
      document.getElementById('longitude').value = lng;

      // Di chuyển bản đồ tới vị trí click và thêm marker
      map.panTo(event.latLng);
      addMarker(event.latLng, null, false); // Thêm marker tại vị trí mới
    });

    // Đóng modal khi nhấn nút đóng
    span.onclick = function() {
      modal.style.display = "none";
    };

    // Đóng modal khi click ra ngoài
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };

    // Tìm kiếm cửa hàng
    // Lắng nghe sự kiện click vào nút tìm kiếm
    document.getElementById('searchButton').onclick = function() {
      searchStore();
    };

    // Lắng nghe sự kiện nhấn phím trong ô input tìm kiếm
    document.getElementById('search').addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        searchStore();
      }
    });

    // Hàm tìm kiếm cửa hàng
    function searchStore(selectedStore) {
        if (selectedStore) {
            // Nếu có cửa hàng được chọn từ gợi ý
            var CH = arrStore.find(store => store.tenCH === selectedStore.tenCH);
            if (CH) {
                console.log("Tọa độ tìm thấy:", CH.kinhdo, CH.vido);
                updateMapLocation(CH.kinhdo, CH.vido, CH);
            }
        } else {
            // Nếu không có cửa hàng được chọn từ gợi ý, thực hiện tìm kiếm
            if (Array.isArray(arrStore) && arrStore.length > 0) {
                var searchTerm = document.getElementById('search').value.toLowerCase();

                // Tìm kiếm dựa trên maCH hoặc tenCH có chứa searchTerm
                var CH = arrStore.find(store => 
                    store.maCH.toLowerCase() === searchTerm || 
                    store.tenCH.toLowerCase().includes(searchTerm)
                );

                if (CH) {
                    console.log("Tọa độ tìm thấy:", CH.kinhdo, CH.vido);
                    updateMapLocation(CH.kinhdo, CH.vido, CH);
                } else {
                    alert('Cửa hàng không tìm thấy');
                }
            }
        }
    }

    window.showSuggestions = function() {
      var searchTerm = document.getElementById('search').value.toLowerCase();
      var suggestionsDiv = document.getElementById('suggestions');
      suggestionsDiv.innerHTML = ''; // Xóa gợi ý cũ
      suggestionsDiv.style.display = 'none'; // Ẩn gợi ý
    
      if (searchTerm) {
        // Tìm các cửa hàng phù hợp
        var matchedStores = arrStore.filter(store => 
          store.tenCH.toLowerCase().includes(searchTerm)
        );
    
        if (matchedStores.length > 0) {
          matchedStores.forEach(store => {
            var suggestionItem = document.createElement('div');
            // Hiển thị cả tên cửa hàng và địa chỉ
            suggestionItem.innerText = store.tenCH + ' - ' + store.diaChiCH;
            suggestionItem.onclick = function() {
              // Cập nhật ô tìm kiếm với tên cửa hàng và địa chỉ
              document.getElementById('search').value = store.tenCH + ' - ' + store.diaChiCH;
              searchStore(store); // Tìm cửa hàng đã chọn
              suggestionsDiv.innerHTML = ''; // Xóa gợi ý
              suggestionsDiv.style.display = 'none'; // Ẩn gợi ý
            };
            suggestionsDiv.appendChild(suggestionItem);
          });
          suggestionsDiv.style.display = 'block'; // Hiển thị gợi ý
        }
      }
    };
    
    // Cập nhật vị trí bản đồ
    function updateMapLocation(lat, lng, storeInfo) {
      var newLocation = new google.maps.LatLng(lat, lng);
      map.panTo(newLocation);
      addMarker(newLocation, storeInfo, true); // Thêm marker với thông tin cửa hàng và mở InfoWindow
    }

    // Thêm các marker ban đầu cho các cửa hàng
    for (let i = 0; i < arrStore.length; i++) {
      addMarker(new google.maps.LatLng(arrStore[i].kinhdo, arrStore[i].vido), arrStore[i], false);
    }

    // Lưu dữ liệu vị trí (thực hiện logic lưu trong thực tế)
    document.getElementById('saveLocation').onclick = function() {
      modal.style.display = "none";
    };

    console.log(arrStore); // Xem danh sách các cửa hàng


  };
})();
