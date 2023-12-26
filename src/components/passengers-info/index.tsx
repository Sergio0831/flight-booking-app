import PassengersForm from '../passengers-form';

export default function PassengersInfo() {
  return (
    <div className="grid grid-rows-[min-content_1fr] h-full">
      <h1 className="mb-5 font-medium text-xl">Passengers Info</h1>
      <PassengersForm />
    </div>
  );
}
