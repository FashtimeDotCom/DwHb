const globaldata = {
  curCityName: ''
}

function updateData(index,data){
this.globaldata.index=data;
}

module.export = {
  updateGlobalData: updateData,
  data: globaldata
}