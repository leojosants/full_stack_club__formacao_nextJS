import Header, { HeaderLeft, HeaderSubtitle, HeaderTitle } from "./_components/header";


const Home = () => {
    return (
        <div className="m-8 w-full space-y-8 bg-white p-8 rounded-lg">
            <Header>
                <HeaderLeft>
                    <HeaderSubtitle>
                        {"Visão geral dos dados"}
                    </HeaderSubtitle>

                    <HeaderTitle>
                        {"Dashboard"}
                    </HeaderTitle>
                </HeaderLeft>
            </Header>
        </div>
    );
};

export default Home;