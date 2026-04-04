export default function ReadingList() {

    const reading_list = [
        {
            title: "Creature Of Jekyll Island",
            link: "www.google.com"
        },
        {
            title: "Book 2",
            link: "link to book 2"
        }
    ]

    return (
        <div>
            <h2>Reading List</h2>
            <ul>
            {reading_list.map((item, index) => (
                <li key={index}>
                <a href={item.link}>{item.title}</a>
                </li>
            ))}
            </ul>
        </div>
    )
}