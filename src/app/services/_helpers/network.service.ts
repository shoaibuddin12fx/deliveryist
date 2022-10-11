import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilityService } from './utility.service';
import { ApiService } from './api.service';
import { config } from 'src/app/shared/config/api.config';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  urls: any = config.api;
  constructor(
    public http: HttpClient,
    public utility: UtilityService,
    public api: ApiService
  ) {}

  // firebaselogin(data){
  //   return this.httpPostResponse('user/firebaselogin', data, null, true, true);
  // }

  isAuthorized() {
    return this.httpPostResponse(
      this.urls.user.authorize,
      {},
      null,
      true,
      true
    );
  }

  postLogin(data) {
    return this.httpPostResponse(this.urls.user.login, data, null, true, true);
  }

  setFCMToken(fcm_token) {
    return this.httpPostResponse(
      this.urls.user.addFcmToken,
      { fcm_token },
      null,
      true,
      true
    );
  }

  postLogout() {
    return this.httpPostResponse(this.urls.user.logout, {}, null, false, false);
  }

  postRegister(data) {
    return this.httpPostResponse(
      this.urls.user.register,
      data,
      null,
      true,
      true
    );
  }

  postForgetPassword(data) {
    return this.httpPostResponse(
      this.urls.user.forgetpassword,
      data,
      null,
      true,
      true
    );
  }

  postDeviceToken(data) {
    return this.httpPostResponse(
      this.urls.user.deviceToken,
      data,
      null,
      true,
      true
    );
  }

  postGetAllProducts(data) {
    return this.httpPostResponse(this.urls.product.all, data, null, true, true);
  }

  postAddProduct(data) {
    return this.httpPostResponse(this.urls.product.add, data, null, true, true);
  }

  postUpdateProduct(data) {
    return this.httpPostResponse(
      this.urls.product.update,
      data,
      null,
      true,
      true
    );
  }

  postGetProductChatRoom(data) {
    return this.httpPostResponse(
      this.urls.product.chatroom,
      data,
      null,
      true,
      true
    );
  }

  postSetProductFavorite(data) {
    return this.httpPostResponse(
      this.urls.product.setFavorite,
      data,
      null,
      false,
      true
    );
  }

  postFileUpload(itemId, urls) {
    console.log(urls);
    return this.httpPostResponse(
      this.urls.product.uploadimages + itemId,
      urls,
      null,
      true,
      true,
      'multipart/form-data'
    );
  }

  postSingleFileUpload(file) {
    let req = { file: file };
    return this.httpPostResponse(
      this.urls.product.uploadimage,
      req,
      null,
      true,
      true
    );
  }

  postGetRoomMessages(data) {
    return this.httpPostResponse(
      this.urls.chat.getMessages,
      data,
      null,
      true,
      true
    );
  }

  postGetChatList() {
    return this.httpPostResponse(this.urls.chat.chatList, {}, null, true, true);
  }

  postGetMyItems() {
    return this.httpPostResponse(
      this.urls.product.myItems,
      {},
      null,
      true,
      true
    );
  }

  postPlaceOrder(data) {
    console.warn(data);
    return this.httpPostResponse(
      this.urls.product.order,
      data,
      null,
      true,
      true
    );
  }

  postGetOrderDetailById(data) {
    console.warn(data);
    return this.httpPostResponse(
      this.urls.product.getOrderById,
      data,
      null,
      true,
      true
    );
  }

  postGetDeliveryCharges(data) {
    return this.httpPostResponse(
      this.urls.payment.payableAmount,
      data,
      null,
      true,
      true
    );
  }

  userRoleChange(data) {
    return this.httpPostResponse(
      this.urls.user.roleChange,
      data,
      null,
      true,
      true
    );
  }

  sendMessage(messageObj) {
    return this.httpPostResponse(
      this.urls.chat.messages,
      messageObj,
      null,
      false,
      false
    );
  }

  sendRoomMessasge(obj) {
    return this.httpPostResponse(
      this.urls.chat.roomMessages,
      obj,
      null,
      false,
      true
    );
  }

  /*
   * GET REQUESTS
   */

  getProfile() {
    return this.httpGetResponse(this.urls.user.profile, null, true, false);
  }

  getProductById(id) {
    return this.httpGetResponse(
      this.urls.product.getOne + id,
      null,
      true,
      true
    );
  }

  getProductConditions() {
    return this.httpGetResponse(
      this.urls.product.getConditions,
      null,
      false,
      true
    );
  }

  getProductVehicleSize() {
    return this.httpGetResponse(
      this.urls.product.vehiclesizes,
      null,
      false,
      true
    );
  }

  postGetAllCategories() {
    return this.httpGetResponse(this.urls.product.categories, null, true, true);
  }

  postGetAllRoomMessage(id) {
    return this.httpGetResponse(this.urls.chat.messages, id, false, false);
  }

  // Generic Methods for Http Response
  /**
   * @param key
   * @param data
   * @param id
   * @param showloader
   * @param showError
   */

  httpPostResponse(
    key,
    data,
    id = null,
    showloader = false,
    showError = true,
    contenttype = 'application/json'
  ) {
    return this.httpResponse(
      'post',
      key,
      data,
      id,
      showloader,
      showError,
      contenttype
    );
  }

  httpGetResponse(
    key,
    id = null,
    showloader = false,
    showError = true,
    contenttype = 'application/json'
  ) {
    return this.httpResponse(
      'get',
      key,
      {},
      id,
      showloader,
      showError,
      contenttype
    );
  }

  // default 'Content-Type': 'application/json',
  httpResponse(
    type = 'get',
    key,
    data,
    id = null,
    showloader = false,
    showError = true,
    contenttype = 'application/json'
  ) {
    return new Promise((resolve) => {
      if (showloader == true) {
        this.utility.showLoader();
      }

      const _id = id ? '/' + id : '';
      const url = key + _id;
      console.log(contenttype);
      let reqOpts = {
        headers: new HttpHeaders({
          'Content-Type': contenttype,
        }),
      };

      const seq =
        type == 'get'
          ? this.api.get(url, null, reqOpts)
          : this.api.post(url, data, reqOpts);

      seq.subscribe(
        (res: any) => {
          if (showloader == true) {
            this.utility.hideLoader();
          }

          if (res['bool'] != true) {
            if (showError) {
              this.utility.presentAlert(res['message']);
            }
            resolve(null);
          } else {
            resolve(res);
          }
        },
        (err) => {
          let error = err['error'];
          if (showloader == true) {
            this.utility.hideLoader();
          }

          if (showError) {
            this.utility.showToast(data['message'], 'error');
            // this.utility.presentAlert(error['message']);
          }

          console.log(err);

          resolve(null);
        }
      );
    });
  }
}
