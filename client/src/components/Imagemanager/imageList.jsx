import React from "react";

const ImageList = ({ setBaseImage, customBaseImage }) => {
	return (
		<div>
			<section
				className='image_list'
				onChange={(e) => {
					setBaseImage(e.target.value);
				}}
			>
				{customBaseImage ? (
					<div>
						<input
							type='radio'
							id='image_6'
							name='select'
							value='custom'
							checked={customBaseImage !== "" ? true : false}
						/>
						<label className='image_label' for='image_6'>
							<h2
								style={{
									width: "100%",
									// textOverflow: "clip",
									wordWrap: "break-word",
									lineHeight: "25px",
								}}
							>
								{customBaseImage}
							</h2>
						</label>
					</div>
				) : (
					<section className='image_list'>
						<div>
							<input type='radio' id='image_1' name='select' value='ubuntu' />
							<label className='image_label' for='image_1'>
								<h2>Ubuntu</h2>
							</label>
						</div>
						<div>
							<input type='radio' id='image_2' name='select' value='fedora' />
							<label className='image_label' for='image_2'>
								<h2>Fedora</h2>
							</label>
						</div>
						<div>
							<input type='radio' id='image_3' name='select' value='centOS' />
							<label className='image_label' for='image_3'>
								<h2>CentOS</h2>
							</label>
						</div>
						<div>
							<input
								type='radio'
								id='image_4'
								name='select'
								value='4'
								disabled
							/>
							<label className='image_label' for='image_4'>
								<h2>Arch</h2>
							</label>
						</div>
						<div>
							<input type='radio' id='image_5' name='select' value='node' />
							<label className='image_label' for='image_5'>
								<h2>Node</h2>
							</label>
						</div>
					</section>
				)}
			</section>
		</div>
	);
};

export default ImageList;
