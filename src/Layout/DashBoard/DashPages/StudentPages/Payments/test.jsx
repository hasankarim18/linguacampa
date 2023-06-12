// I have this code 
// app.get("/updateSeats", async (req, res) => {
//   try {
//     const enrolledStudents = await enrollCollections.find().toArray();
//     const classes = await classesCollections.find({ status: "approved" }).toArray();

// import { notifyManager } from "@tanstack/react-query"

   
//     // write code to update using put / pathch the classes seats / seats will be unchanged and two new field will be added number of enrolled students and seats left
   
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error updating seats");
//   }
// });

// --------------------------
// my enrolledStudents looks like
// "enrolledStudents": [
//     {
//       "_id": "6486a6ae7c89ea7a85a60993",
//       "enrolledClassIds": [
//         "6485509d1a52825276ada69c",
//         "64856a4d4314526e3a86f684",
//         "64858cb7ed760de014f83764",
//         "6485509d1a52825276ada69c",
//         "64856a4d4314526e3a86f684",
//         "6485509d1a52825276ada69c",
//         "64856a4d4314526e3a86f684",
//         "64858cb7ed760de014f83764"
//       ],
//       "studentId": "s1@mail.com",
//       "date": "2023-06-12T05:01:34.192Z"
//     },
//     {
//       "_id": "6486a98800befd13eb5e79db",
//       "enrolledClassIds": [
//         "6485509d1a52825276ada69c",
//         "64856a4d4314526e3a86f684"
//       ],
//       "studentId": "st4@mail.com",
//       "date": "2023-06-12T05:13:44.585Z"
//     }
//   ],
//   -----
//   and classes looks like
//   classes": [
//     {
//       "_id": "6485509d1a52825276ada69c",
//       "className": "French Basic",
//       "classImage": "https://cdn.pixabay.com/photo/2019/08/19/15/13/eiffel-tower-4416700_640.jpg",
//       "instructorName": "Hasan as Instructor",
//       "instructorEmail": "hasan@mail.com",
//       "seats": 60,
//       "price": 247,
//       "status": "approved"
//     },
//     {
//       "_id": "64856a4d4314526e3a86f684",
//       "className": "English Grammer",
//       "classImage": "https://cdn.pixabay.com/photo/2013/07/18/15/02/cute-164323_640.jpg",
//       "instructorName": "Instructor One",
//       "instructorEmail": "in1@mail.com",
//       "seats": 70,
//       "price": 350,
//       "status": "approved"
//     },
//     {
//       "_id": "64858cb7ed760de014f83764",
//       "className": "Advance English Grammer",
//       "classImage": "https://cdn.pixabay.com/photo/2016/03/05/20/02/afterlife-1238612_640.jpg",
//       "instructorName": "Hasan as Instructor",
//       "instructorEmail": "hasan@mail.com",
//       "seats": 50,
//       "price": 150,
//       "status": "approved"
//     }
//   ]

//   --- 
//   all of this is saved in mongodb

//    // write code to update using put / pathch the classes seats / seats will be unchanged and two new field will be added number of enrolled students and seats left

// in mongodb enrollcollections 

// i have enrolled students as 
// {
//     _id: a;dkfj,
//     enrolledClassIds:[1,2,3]
//     studentId:st@Mail.com,

// }

// how can i check get enrolled Class title using enrolledClassIds for specific studentId