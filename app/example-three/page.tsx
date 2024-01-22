import Chat from "./components/chat";

const ExampleThreePage = () => {
  return (
    <div className="container max-h-screen flex flex-col">
      {/* <div className="h-20">
        <h1 className="text-2xl font-serif font-bold mt-2">Page Three</h1>
        <p className="text-md">Chat with a twist</p>
      </div> */}
      <div className="flex-grow h-screen">
        <Chat />
      </div>
    </div>
  );
};

export default ExampleThreePage;
