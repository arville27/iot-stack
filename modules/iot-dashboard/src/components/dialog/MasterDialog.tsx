import { Fragment, PropsWithChildren } from "react";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
  title: React.ReactNode;
  dialogState: { isOpen: boolean; setIsOpen: (state: boolean) => void };
};

const MyDetailDialog: React.FC<PropsWithChildren<Props>> = ({
  children,
  title,
  dialogState,
}) => {
  const dialogIsOpen = dialogState.isOpen;
  const setdialogIsOpen = dialogState.setIsOpen;

  return (
    <>
      <Transition appear show={dialogIsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => setdialogIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-base-200 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="mb-6 text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MyDetailDialog;
