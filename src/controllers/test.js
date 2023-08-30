export async function separateDate(Date){
    const result = Date.split("T")
    return result[0]
}

const hj = await separateDate("2023-08-18T17:00:00.000Z")
console.log(hj)