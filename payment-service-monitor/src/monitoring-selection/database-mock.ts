//This mocks the database and its functions
export function dbMock(dto: any) {
  var serviceList = [
    {
      _id: '0',
      name: 'Account Service',
      serviceUrl: 'http://localhost:3131',
    },
  ];
  serviceList.push(dto);
  this.save = () => {
    return dto;
  };

  /**
   * This mock findByIdAndDelete method iterates through all
   * services in the database and finds the service with the
   * matching unique id and returns it. If such service does not exist
   * a mock error message is returned.
   */
  this.findByIdAndDelete = id => {
    var searchId = id;
    for (var i = 0; i < serviceList.length; i++) {
      if (serviceList[i] && serviceList[i]._id === searchId) {
        var temp = serviceList[i];
        serviceList[i] = null;
        return temp;
      }
    }
    return 'Not in Database';
  };

  /**
   * This mock find method iterates through all
   * services in the database and finds the services with the
   * matching service urls and returns them in an array.
   */
  this.find = ({ serviceUrl: requestUrl }) => {
    let serviceArray = [];
    for (var i = 0; i < serviceList.length; i++) {
      if (
        serviceList[i] &&
        serviceList[i].serviceUrl === requestUrl.serviceUrl
      ) {
        serviceArray.push(serviceList[i]);
      }
    }
    return serviceArray;
  };
}
