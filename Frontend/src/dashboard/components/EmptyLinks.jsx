const EmptyLinks = ({ onCreate }) => {

    return (
        <div
            className="flex min-h-[250px] flex-col
            items-center justify-center px-6 text-center"
        >

            <div
                className="flex h-14 w-14 items-center
                justify-center rounded-2xl bg-yellow-50
                text-yellow-600"
            >

                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-7 w-7"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                    />

                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                    />
                </svg>

            </div>


            <h3 className="mt-4 text-sm font-semibold text-gray-950">
                No links created yet
            </h3>


            <p className="mt-1 max-w-sm text-xs leading-5 text-gray-400">
                Create your first short link and start tracking
                clicks from your dashboard.
            </p>


            <button
                onClick={onCreate}
                className="mt-5 flex items-center gap-2
                rounded-xl bg-gray-950 px-4 py-2.5
                text-xs font-semibold text-white
                transition-all hover:bg-gray-800
                active:scale-[0.98]"
            >

                <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 3a.75.75 0 0 1 .75.75v5.5h5.5a.75.75 0 0 1 0 1.5h-5.5v5.5a.75.75 0 0 1-1.5 0v-5.5h-5.5a.75.75 0 0 1 0-1.5h5.5v-5.5A.75.75 0 0 1 10 3Z"
                        clipRule="evenodd"
                    />
                </svg>

                Create your first link

            </button>

        </div>
    );
};

export default EmptyLinks;