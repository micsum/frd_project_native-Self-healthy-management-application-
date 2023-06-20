// import {
//   Image,
//   Text,
//   Box,
//   Center,
//   AspectRatio,
//   Stack,
//   Heading,
//   HStack,
//   Button,
// } from "native-base";
// import { useState } from "react";
// import { useNavigation } from "@react-navigation/native";
// import { data } from "../../data/article";

// interface Props {
//   title: string;
//   published_on: string;
//   days: Days[];
// }
// interface Days {
//   name: string;
//   cover_image: string;
//   meals: any[];
// }

// interface Meals {
//   name: string;
//   calories: string;
// }

// interface MealsTitle {
//   food: string;
// }

// export function PlanDetailItem(props: Props) {
//   //   const navigation = useNavigation();
//   return (
//     <>
//       <Text fontSize="4xl">{props.title}</Text>
//       {props.days.map((day) => (
//         <>
//           <Text fontSize="3xl">{day.name}</Text>
//           <Image
//             source={{
//               uri: day.cover_image,
//             }}
//             alt="Alternate Text"
//             size="xl"
//           />
//           {day.meals.map((meal) => (
//             <>
//               <Text fontSize="2x1">{meal.name}</Text>
//             </>
//           ))}
//         </>
//       ))}
//     </>
//   );
// }
