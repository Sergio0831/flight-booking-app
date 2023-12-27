import { OrderPassenger } from '@/lib/definitions';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { capitalizeFirstLetter } from '@/lib/utils';

type PassengersTableProps = {
  passengers: OrderPassenger[];
};

export default function PassengersTable({ passengers }: PassengersTableProps) {
  return (
    <Table className="my-10">
      <TableHeader>
        <TableRow>
          <TableHead>Passenger name</TableHead>
          <TableHead className="text-center">Date of birth</TableHead>
          <TableHead className="text-right">Gender</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {passengers.map((pass) => (
          <TableRow key={pass.id}>
            <TableCell className="text-left">{`${capitalizeFirstLetter(pass.title)} ${
              pass.firstName
            } ${pass.familyName}`}</TableCell>
            <TableCell className="text-center">{pass.dob}</TableCell>
            <TableCell className="text-right">{pass.gender === 'm' ? 'Male' : 'Female'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
