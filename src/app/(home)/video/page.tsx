import { Suspense } from "react";

import VideoComponent from "../../../ui/videoComponent/video-component";

function VideoPage() {
	return (
		<section>
			<Suspense fallback={<p>Loading video...</p>}>
				<VideoComponent />
			</Suspense>
		</section>
	);
}

export default VideoPage;
