/**
 * @file 重写方法
 */

/**
 * @description 数组的浅拷贝
 * @param {Number} 开始拷贝的位置
 * @param {Number} 结束拷贝的位置
 * @return {Array} 返回一个被截取数组
 */
Array.prototype.slice = function(start, end, array){
  //判断三个参数是否为空
  let length = array === null ? 0 : array.length;
  start = start === null ? 0 : start;
  end = end === undefined ? length : end;
  if(!length){
    return []
  }
  //start, end全部转为正数后, 这里不用判断start的正数是否大于length, 因为默认 start < end <= length
  if(start < 0){
    start = -start > length ? 0 : (start + length)
  }
  if(end < 0){
    end += length; 
  }
  end >= length ? length  : end;
  //判断start是否大于end
  length = start > end ? 0 : (end - start >>> 0);
  start >>>= 0;
  let index = -1;
  const result = new Array(length);
  while(++index < length){
    result[index] = array[start + index];
  }
  return result
}