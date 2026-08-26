import { GitHubCalendar } from 'react-github-calendar';
import './styles/GithubGraph.css'; // Make sure this path is correct

const GithubGraph = () => {
    // Optional: Custom theme colors to match your dark portfolio
    const explicitTheme = {
        light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    };

    return (
        <section className="github-section" aria-label="GitHub contribution activity">
            <h2>Commits Over Time</h2>

            {/* These used to be Tailwind utility classes (p-6, bg-[#0d1420],
                border-[#ff6b81], rounded-2xl, shadow-lg). Tailwind is not
                installed, so none of them applied and the calendar rendered
                with no card at all. Styled in GithubGraph.css instead. */}
            <div className="github-graph-container">
                <div className="github-graph-scroll">
                    <GitHubCalendar
                        username="Suso007"
                        colorScheme="dark"
                        theme={explicitTheme}
                        blockSize={16}
                        blockMargin={6}
                        fontSize={16}
                    />
                </div>
            </div>
        </section>
    );
};

export default GithubGraph;
