var map = new AMap.Map("container", {
  resizeEnable: true
});

var geocoder = new AMap.Geocoder({
  city: "010", //城市设为北京，默认：“全国”
  radius: 1000 //范围，默认：500
});
var marker = new AMap.Marker();
function regeoCode() {
  var lnglat = document.getElementById("lnglat").value.split(",");
  map.add(marker);
  marker.setPosition(lnglat);

  geocoder.getAddress(lnglat, function (status, result) {
    if (status === "complete" && result.regeocode) {
      var address = result.regeocode.formattedAddress;
      document.getElementById("address").value = address;
    } else {
      log.error("根据经纬度查询地址失败");
    }
  });
}

function showPosition(position) {
  console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  geocoder.getAddress(`${longitude},${latitude}`, function (status, result) {
    console.log(status);
    console.log(result);

    alert(JSON.stringify(result?.regeocode?.addressComponent));
    alert(JSON.stringify(result?.regeocode?.formattedAddress));
  });
}

function test() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

console.log("---start 1");
test();

map.on("click", function (e) {
  document.getElementById("lnglat").value = e.lnglat;
  regeoCode();
});
document.getElementById("regeo").onclick = regeoCode;
document.getElementById("lnglat").onkeydown = function (e) {
  if (e.keyCode === 13) {
    regeoCode();
    return false;
  }
  return true;
};
