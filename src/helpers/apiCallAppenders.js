const appendSerialNumber = (array) => {
  let count = 1;
  array.forEach((entry) => {
    console.log(entry);
    entry.SR = count;
    count++;
  });
  return array;
};
export default appendSerialNumber;
