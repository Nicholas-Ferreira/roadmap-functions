module.exports = {
  snapshotToArray: (snapshot) => {
    let array = []
    snapshot.forEach((doc) => {
      array.push({
        _id: doc.id,
        ...doc.data()
      })
    });
    return array
  }
}