export const handleDevideList = (list = []) => {
     let numList = Math.ceil(list.length / 12);
     if (numList > 1) {
          const list_obj = {};
          for (let i = 0; i < numList; i++) {
               list_obj[`${i + 1}`] = list.slice(i * 12, i * 12 + 12);
          }
          return list_obj;
     }
     return { 1: list };
};

export const handleFilterPriceService = (list = [], min, max) => {
     const sort = list.filter((item) => {
          return Number(item.price) >= min && Number(item.price) <= max;
     });
     return sort;
};

const handleSortName = (list) => {
     let ans = [...list];
     for (let i = 0; i < ans.length - 1; i++) {
          for (let j = i + 1; j < ans.length; j++) {
               if (ans[i].name[0] < ans[j].name[0]) {
                    let swap = ans[i];
                    ans[i] = ans[j];
                    ans[j] = swap;
               }
          }
     }
     return ans;
};

const handleSortPrice = (list) => {
     let ans = [...list];
     for (let i = 0; i < ans.length - 1; i++) {
          for (let j = i + 1; j < ans.length; j++) {
               if (ans[i].price > ans[j].price) {
                    let swap = ans[i];
                    ans[i] = ans[j];
                    ans[j] = swap;
               }
          }
     }
     return ans;
};

export const handleSortDisplayList = (arr, type) => {
     let list = [...arr];

     switch (type.toLowerCase()) {
          case "a - z":
          case "z - a":
               let sortNameList = handleSortName(list);
               if (type.toLowerCase() === "z - a") list = sortNameList;
               else list = sortNameList.reverse();
               break;
          case "tăng dần":
          case "giảm dần":
               let sortPriceList = handleSortPrice(list);
               if (type.toLowerCase() === "giảm dần") list = sortPriceList;
               else list = sortPriceList.reverse();
               break;
          default:
               return list;
     }
     return list;
};
