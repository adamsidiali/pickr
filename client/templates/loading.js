Template.loading.created = function () {
  IonLoading.show({
    customTemplate: '<i class="icon ion-loading-c"></i><br><h3></h3>'
  });
}

Template.loading.destroyed = function () {
  IonLoading.hide();
}
