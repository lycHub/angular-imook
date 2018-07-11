

import {city_data} from "./area-data";
export const getProvinces = () => {
  const provinces = [];
  for (const province in city_data) {
    if (province) {
      provinces.push(province);
    }
  }
  return [...provinces];
};

// 获取某省份下的所有城市
export const getCitiesByProvince = (province: string) => {
  if (!province || !city_data[province]) {
    return [];
  }
  const cities = city_data[province];
  const citiesByProvice = [];
  for (const city in cities) {
    if (city) {
      citiesByProvice.push(city);
    }
  }
  return [...citiesByProvice];
};


// 根据省份和城市的选择得到地区列表
export const getAreasByCity = (province: string, city: string) => {
  if (!province || !city || !city_data[province][city]) {
    return [];
  }
  const areas = city_data[province][city];
  return [...areas];
};
