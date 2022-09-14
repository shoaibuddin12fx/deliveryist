export let config = {
  api: {
    // url: 'https://us-central1-deliveryist.cloudfunctions.net',
    // url: 'https://deliveryist.com/admin-laravel-6x/public/api',
    // url: 'https://deliveryist.com/admin-laravel-7x/public/api',
    // url: 'http://localhost/admin_laravel_7x/public/api',
    url: 'http://deliverist.waprojects.space/api',
    // url: 'http://localhost:8000/api',
    // url: 'http://test.waapsdeveloper.com/api',
    user: {
      login: 'user/login',
      register: 'user/register',
      forgetpassword: 'user/forgetpassword',
      authorize: 'user/authorize',
      updateProfile: 'user/updateProfile',
      profile: 'user/profile',
      consumerProfile: 'user/consumerProfile',
      driverProfile: 'job/deliveryJobs',
      getOTP: 'user/sendOTP',
      verifyOTP: 'user/verifyOTP',
      updatePassword: 'user/updatePassword',
      logout: 'user/logout',
      deleteAccount: 'user/deleteAccount',
      reportIssue: 'user/reportIssue',
      deviceToken: 'user/registerDeviceToken',
      trackUser: 'track/currentUserLocation',
      roleChange: 'user/changeRole',
      socialLogin: 'user/social_login',
      driverLicenseVerify: 'user/',
    },
    product: {
      getOne: 'product/products/',
      add: 'product/add',
      update: 'product/update',
      remove: 'product/remove',
      all: 'product/allProducts',
      uploadimages: 'product/uploadPhotos/',
      uploadimage: 'product/imageUpload',
      chatroom: 'rtc/openRoom',
      myItems: 'product/myitem',
      order: 'product/orderProduct',
      categories: 'product/getCategories',
      setFavorite: 'product/setFavorites',
      getConditions: 'product/getConditions',
      vehiclesizes: 'product/getVehicleSizes',
    },

    payment: {
      payableAmount: 'payment/getPayableAmount',
    },
    chat: {
      getMessages: 'rtc/getMessages',
      add: 'chat/messages',
      all: 'product/products',
      uploadimages: 'product/uploadPhotos',
      chatroom: 'chat/openRoom',
      chatList: 'chat/chatList',
      messages: 'chat/messages',
      roomMessages: 'chat/roomMessages',
    },
    job: {
      // Consumer
      addJob: 'job/add',
      trackJob: 'job/trackJob/', //'job/',
      trackJobLocations: 'job/trackJobLocations/',
      gettrackJobLocations: 'job/trackJobLocations/',
      getAllJob: 'job/postedJobs?offset=0&jobtype=', // 'job/postedJobs',
      cancelJob: 'job/delete',
      ratingAndReview: 'job/reviewFromClient', // 'job/complete',
      sendJobCompleteOtp: 'job/sendJobCompleteOtp',
      // cancelDriver: 'job/cancelDriver',
      calculateAmount: 'payment/getPayableAmount',
      // customerRatingAndReview: 'reviewFromClient',

      // Driver
      jobList: 'job/nearbyJobs',
      applyJob: 'job/accept',
      selectedJobList: 'job/deliveryJobs',
      packageStatusChange: 'job/update',
      driverRatingAndReview: 'job/ratingsFromDriver',
      submitVehicleData: 'job/uploadDriverLicence', //'job/vehicleData',
      filterJob: 'job/nearbyJobs',
    },
    notification: {
      driverNotification: 'notification/driver',
      consumerNotification: 'notification/consumer',
      notifyStatus: 'user/getNotifyParams',
      updateNotifyStatus: 'user/postNotifyParams',
    },
    pay: {
      payToStripe: 'payment/payWithCard',
      cardDetail: 'payment/getPaymentMethods',
      setAmountWallet: 'wallet/setAmountInWallet',
    },
    wallet: {
      getWalletRecord: 'wallet/getWalletRecords',
      getCashOut: 'wallet/getWalletCashout',
      getEarnings: 'wallet/getWalletEarnings',
    },
  },
  temporary_token: '9wg4EdIH2LnVa15RQUgJ',
  PushOptions: {
    android: {
      senderID: '597701900888',
      sound: true,
      vibrate: true,
      clearBadge: true,
    },
  },
};
