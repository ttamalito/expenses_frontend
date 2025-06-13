import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import OneExpenseSummaryTypeDeclaration from '../expensesComponents/utils/types/OneExpenseSummaryType';
// import { desktopOS, valueFormatter } from './webUsageStats';

interface IPieChartForSummaryProps {
  expenses: OneExpenseSummaryTypeDeclaration[];
}

export default function PieChartForSummary({
  expenses,
}: IPieChartForSummaryProps) {
  const desktopOS = [
    {
      label: 'Windows',
      value: 72.72,
    },
    {
      label: 'OS X',
      value: 16.38,
    },
    {
      label: 'Linux',
      value: 3.83,
    },
    {
      label: 'Chrome OS',
      value: 2.42,
    },
    {
      label: 'Other',
      value: 4.65,
    },
  ];
  const [summaryData, setSummaryData] =
    React.useState<{ label: string; value: number }[]>(desktopOS);
  React.useEffect(() => {
    setSummaryData(getSummaryData(expenses));
  }, [expenses]);

  const someData = summaryData;
  console.log('someData');
  console.log(someData);

  const valueFormatter = (item: { value: number }) => {
    return `${item.value}%`;
  };

  return (
    <>
      <PieChart
        series={[
          {
            data: summaryData, // summaryData,
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            valueFormatter,
          },
        ]}
        height={200}
      />
    </>
  );
}

function getSummaryData(
  expenses: OneExpenseSummaryTypeDeclaration[],
): { label: string; value: number }[] {
  let essentialFoodSpent = 0;
  let nonEssentialFoodSpent = 0;
  let rentSpent = 0;
  let giftSpent = 0;
  let otherSpent = 0;
  let allOthersSpent = 0;
  let partySpent = 0;
  let clothesSpent = 0;
  let phoneSpent = 0;
  let homeSpent = 0;
  let recreationalPurchaseSpent = 0;
  let vacationSpent = 0;
  let investmentSpent = 0;
  let gymSpent = 0;
  let medicineSpent = 0;
  let insuranceSpent = 0;
  let savingsSpent = 0;

  let totalSpent = 0;

  expenses.forEach((expense) => {
    switch (expense.type) {
      case 'essential_food':
        essentialFoodSpent += Number(expense.amount);
        totalSpent += Number(expense.amount);
        break;
      case 'non_essential_food':
        nonEssentialFoodSpent += Number(expense.amount);
        totalSpent += Number(expense.amount);
        break;
      case 'rent':
        rentSpent += Number(expense.amount);
        totalSpent += Number(expense.amount);
        break;
      case 'gift':
        giftSpent += Number(expense.amount);
        totalSpent += Number(expense.amount);
        break;
      case 'other':
        otherSpent += Number(expense.amount);
        totalSpent += Number(expense.amount);
        break;
      case 'party':
        partySpent += Number(expense.amount);
        totalSpent += Number(expense.amount);
        break;
      case 'recreational_purchase':
        recreationalPurchaseSpent += Number(expense.amount);
        totalSpent += Number(expense.amount);
        break;
      case 'phone':
        phoneSpent += Number(expense.amount);
        totalSpent += Number(expense.amount);
        break;
      case 'vacation':
        vacationSpent += Number(expense.amount);
        totalSpent += Number(expense.amount);
        break;
      case 'investment':
        investmentSpent += Number(expense.amount);
        totalSpent += Number(expense.amount);
        break;
      case 'gym':
        gymSpent += Number(expense.amount);
        totalSpent += Number(expense.amount);
        break;
      case 'medicine':
        medicineSpent += Number(expense.amount);
        totalSpent += Number(expense.amount);
        break;
      case 'insurance':
        insuranceSpent += Number(expense.amount);
        totalSpent += Number(expense.amount);
        break;
      case 'clothes':
        clothesSpent += Number(expense.amount);
        totalSpent += Number(expense.amount);
        break;
      case 'home':
        homeSpent += Number(expense.amount);
        totalSpent += Number(expense.amount);
        break;
      case 'savings':
        savingsSpent += Number(expense.amount);
        totalSpent += Number(expense.amount);
        break;
      default:
        console.log('Adding for: ' + expense.type);
        allOthersSpent += Number(expense.amount);
        totalSpent += Number(expense.amount);
        break;
    }
    // if (expense.type === 'essential_food') {
    //     essentialFoodSpent += Number(expense.amount);
    //     totalSpent += Number(expense.amount);
    // }
    // if (expense.type === 'non_essential_food') {
    //     nonEssentialFoodSpent += Number(expense.amount);
    //     totalSpent += Number(expense.amount);
    // }
    // if (expense.type === 'rent') {
    //     rentSpent += Number(expense.amount);
    //     totalSpent += Number(expense.amount);
    // }
    // if (expense.type === 'gift') {
    //     giftSpent += Number(expense.amount);
    //     totalSpent += Number(expense.amount);
    // }
    // if (expense.type === 'other') {
    //     otherSpent += Number(expense.amount);
    //     totalSpent += Number(expense.amount);
    // } else {
    //     allOthersSpent += Number(expense.amount);
    //     totalSpent += Number(expense.amount);
    // }
  });

  // convert to absolute values
  essentialFoodSpent = Math.abs(essentialFoodSpent);
  nonEssentialFoodSpent = Math.abs(nonEssentialFoodSpent);
  rentSpent = Math.abs(rentSpent);
  giftSpent = Math.abs(giftSpent);
  otherSpent = Math.abs(otherSpent);
  totalSpent = Math.abs(totalSpent);
  allOthersSpent = Math.abs(allOthersSpent);
  partySpent = Math.abs(partySpent);
  clothesSpent = Math.abs(clothesSpent);
  phoneSpent = Math.abs(phoneSpent);
  homeSpent = Math.abs(homeSpent);
  recreationalPurchaseSpent = Math.abs(recreationalPurchaseSpent);
  vacationSpent = Math.abs(vacationSpent);
  investmentSpent = Math.abs(investmentSpent);
  gymSpent = Math.abs(gymSpent);
  medicineSpent = Math.abs(medicineSpent);
  insuranceSpent = Math.abs(insuranceSpent);
  savingsSpent = Math.abs(savingsSpent);

  const essentialFoodSpentPercentage = (essentialFoodSpent / totalSpent) * 100;
  const nonEssentialFoodSpentPercentage =
    (nonEssentialFoodSpent / totalSpent) * 100;
  const rentSpentPercentage = (rentSpent / totalSpent) * 100;
  const giftSpentPercentage = (giftSpent / totalSpent) * 100;
  const otherSpentPercentage = (otherSpent / totalSpent) * 100;
  const allOthersSpentPercentage = (allOthersSpent / totalSpent) * 100;
  const partySpentPercentage = (partySpent / totalSpent) * 100;
  const clothesSpentPercentage = (clothesSpent / totalSpent) * 100;
  const phoneSpentPercentage = (phoneSpent / totalSpent) * 100;
  const homeSpentPercentage = (homeSpent / totalSpent) * 100;
  const recreationalPurchaseSpentPercentage =
    (recreationalPurchaseSpent / totalSpent) * 100;
  const vacationSpentPercentage = (vacationSpent / totalSpent) * 100;
  const investmentSpentPercentage = (investmentSpent / totalSpent) * 100;
  const gymSpentPercentage = (gymSpent / totalSpent) * 100;
  const medicineSpentPercentage = (medicineSpent / totalSpent) * 100;
  const insuranceSpentPercentage = (insuranceSpent / totalSpent) * 100;
  const savingsSpentPercentage = (savingsSpent / totalSpent) * 100;

  const essentialFoodObject = {
    label: 'Essential Food',
    value: essentialFoodSpentPercentage,
  };
  const nonEssentialFoodObject = {
    label: 'Non Essential Food',
    value: nonEssentialFoodSpentPercentage,
  };
  const rentObject = {
    label: 'Rent',
    value: rentSpentPercentage,
  };
  const giftObject = {
    label: 'Gift',
    value: giftSpentPercentage,
  };
  const otherObject = {
    label: 'Other',
    value: otherSpentPercentage,
  };
  const allOthersObject = {
    label: 'All Others',
    value: allOthersSpentPercentage,
  };
  const partyObject = {
    label: 'Party',
    value: partySpentPercentage,
  };
  const clothesObject = {
    label: 'Clothes',
    value: clothesSpentPercentage,
  };
  const phoneObject = {
    label: 'Phone',
    value: phoneSpentPercentage,
  };
  const homeObject = {
    label: 'Home',
    value: homeSpentPercentage,
  };
  const recreationalPurchaseObject = {
    label: 'Recreational Purchase',
    value: recreationalPurchaseSpentPercentage,
  };
  const vacationObject = {
    label: 'Vacation',
    value: vacationSpentPercentage,
  };
  const investmentObject = {
    label: 'Investment',
    value: investmentSpentPercentage,
  };
  const gymObject = {
    label: 'Gym',
    value: gymSpentPercentage,
  };
  const medicineObject = {
    label: 'Medicine',
    value: medicineSpentPercentage,
  };
  const insuranceObject = {
    label: 'Insurance',
    value: insuranceSpentPercentage,
  };
  const savingsObject = {
    label: 'Savings',
    value: savingsSpentPercentage,
  };

  const allObjects = [];
  allObjects.push(essentialFoodObject);
  allObjects.push(nonEssentialFoodObject);
  allObjects.push(rentObject);
  allObjects.push(giftObject);
  allObjects.push(otherObject);
  allObjects.push(allOthersObject);
  allObjects.push(partyObject);
  allObjects.push(clothesObject);
  allObjects.push(phoneObject);
  allObjects.push(homeObject);
  allObjects.push(recreationalPurchaseObject);
  allObjects.push(vacationObject);
  allObjects.push(investmentObject);
  allObjects.push(gymObject);
  allObjects.push(medicineObject);
  allObjects.push(insuranceObject);
  allObjects.push(savingsObject);

  const sixHighestObjects = [];

  for (let i = 0; i < allObjects.length; i++) {
    if (i < 6) {
      sixHighestObjects.push(allObjects[i]);
      // sort the array
      sixHighestObjects.sort((a, b) => {
        return a.value - b.value;
      });

      continue;
    }

    for (let j = 0; j < sixHighestObjects.length; j++) {
      if (allObjects[i].value > sixHighestObjects[j].value) {
        sixHighestObjects[j] = allObjects[i];
        sixHighestObjects.sort((a, b) => {
          return a.value - b.value;
        });
        break;
      }
    }
  }

  return sixHighestObjects;
}
